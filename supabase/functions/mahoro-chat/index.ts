
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, userId, sessionId, language = 'en' } = await req.json()
    
    console.log('Mahoro chat request:', {
      userId: userId || 'anonymous',
      sessionId,
      language,
      messageLength: message?.length
    })

    // Get the Anthropic API key
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }

    // Determine if user is anonymous or authenticated
    const isAnonymous = !userId || userId === 'anonymous' || userId === 'guest'
    const actualUserId = isAnonymous ? null : userId

    console.log('Processing request for:', isAnonymous ? 'anonymous user' : `user ${actualUserId}`)

    // Create a system prompt based on language
    const systemPrompts = {
      en: `You are Mahoro, a compassionate AI mental health support companion for HopeCore Hub. 
      You provide emotional support, coping strategies, and encourage users to seek professional help when needed.
      Always be empathetic, non-judgmental, and culturally sensitive. Keep responses concise but warm.
      If someone is in crisis, direct them to emergency services or professional help.`,
      
      rw: `Uri Mahoro, umunyangazi w'ubwoba bwo gufasha abantu mu buzima bwabo. 
      Utanga ubufasha mu mutima, amayeri yo guhangana n'ibibazo, kandi ushishikariza abantu gushaka ubufasha bw'abahanga igihe bikenewe.
      Buri gihe wiyerekane nk'umunyangazi, udatekereza abantu, kandi wubaha umuco. Koresha amagambo make ariko yuzuye urukundo.
      Niba umuntu afite ikibazo gikomeye, mumuherekeze kuri serivisi z'ubufasha bwihutirwa cyangwa abahanga.`,
      
      fr: `Vous êtes Mahoro, un compagnon d'IA compatissant pour le soutien en santé mentale chez HopeCore Hub.
      Vous fournissez un soutien émotionnel, des stratégies d'adaptation et encouragez les utilisateurs à chercher une aide professionnelle si nécessaire.
      Soyez toujours empathique, sans jugement et culturellement sensible. Gardez les réponses concises mais chaleureuses.
      Si quelqu'un est en crise, dirigez-le vers les services d'urgence ou une aide professionnelle.`
    }

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        system: systemPrompt
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Claude API error:', response.status, errorText)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const aiMessage = data.content[0].text

    console.log('Claude response received, length:', aiMessage.length)

    // Only try to store messages if we have a valid authenticated user ID
    if (actualUserId && sessionId && !isAnonymous) {
      try {
        // Import Supabase client
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )

        // Store user message
        const { error: userMessageError } = await supabase
          .from('chat_messages')
          .insert({
            user_id: actualUserId,
            session_id: sessionId,
            message: message,
            is_from_user: true,
            language: language
          })

        if (userMessageError) {
          console.error('Error storing user message:', userMessageError)
        }

        // Store AI response
        const { error: aiMessageError } = await supabase
          .from('chat_messages')
          .insert({
            user_id: actualUserId,
            session_id: sessionId,
            message: aiMessage,
            is_from_user: false,
            language: language
          })

        if (aiMessageError) {
          console.error('Error storing AI message:', aiMessageError)
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError)
        // Continue without storing - don't fail the request for anonymous users
      }
    } else {
      console.log('Skipping message storage for anonymous/guest user')
    }

    return new Response(JSON.stringify({ 
      message: aiMessage,
      success: true 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      },
    })

  } catch (error) {
    console.error('Error in mahoro-chat:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      },
    })
  }
})
