
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SYSTEM_PROMPT = `You are Mahoro, a compassionate AI companion for HopeCore Hub, designed to provide trauma-informed support for survivors of gender-based violence (GBV), sexual and reproductive health (SRH) guidance, and mental health support in Rwanda.

CORE PRINCIPLES:
- Always respond with empathy, validation, and cultural sensitivity
- Prioritize user safety and emotional well-being
- Provide trauma-informed care principles
- Respect Rwandan cultural contexts and values
- Maintain hope and resilience-focused language

LANGUAGE SUPPORT:
- Respond in the same language the user communicates in
- Support Kinyarwanda, English, French, and Swahili
- Use culturally appropriate expressions and terminology

CRISIS PROTOCOLS:
- If user expresses immediate danger or suicidal thoughts, encourage them to contact:
  * Isange One Stop Center: 3029
  * Rwanda National Police: 3512
  * HopeCore Team: +250780332779
- Always validate their courage in reaching out

RESPONSE GUIDELINES:
- Keep responses supportive but concise (2-3 paragraphs max)
- Offer practical coping strategies when appropriate
- Suggest professional resources in Rwanda when needed
- Never provide medical diagnoses or replace professional care
- Focus on empowerment and healing

Remember: You are here to listen, support, and guide users toward healing and resources, not to replace professional help.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, sessionId, language = 'en' } = await req.json();

    console.log('Mahoro chat request:', { userId, sessionId, language, messageLength: message?.length });

    if (!message || !userId || !sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: message, userId, sessionId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store user message
    const { error: userMessageError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        session_id: sessionId,
        message,
        is_from_user: true,
        language
      });

    if (userMessageError) {
      console.error('Error storing user message:', userMessageError);
    }

    // Get conversation history (last 10 messages for context)
    const { data: chatHistory, error: historyError } = await supabase
      .from('chat_messages')
      .select('message, is_from_user, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    if (historyError) {
      console.error('Error fetching chat history:', historyError);
    }

    // Build conversation context
    const conversationHistory = chatHistory?.map(msg => ({
      role: msg.is_from_user ? 'user' : 'assistant',
      content: msg.message
    })) || [];

    // Add current message
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    console.log('Claude response received, length:', aiResponse?.length);

    // Store AI response
    const { error: aiMessageError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        session_id: sessionId,
        message: aiResponse,
        is_from_user: false,
        language
      });

    if (aiMessageError) {
      console.error('Error storing AI message:', aiMessageError);
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        sessionId 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in mahoro-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment, or contact our support team if this continues.',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
