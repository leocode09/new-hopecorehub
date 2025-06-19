
import React from 'npm:react@18.3.1';
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { SignupConfirmationEmail } from './_templates/signup-confirmation.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    console.log('Processing email confirmation request...');
    
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);
    
    console.log('Webhook payload received:', payload);

    let userEmail: string = '';
    let token: string = '';
    let tokenHash: string = '';
    let redirectTo: string = '';
    let emailActionType: string = 'signup';

    // Parse the webhook payload
    try {
      const webhookData = JSON.parse(payload);
      console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2));
      
      // Extract user email from different possible paths
      userEmail = webhookData.user?.email || 
                  webhookData.record?.email || 
                  webhookData.email_data?.user?.email ||
                  webhookData.email;
      
      // Extract other fields
      token = webhookData.token || webhookData.email_data?.token || '';
      tokenHash = webhookData.token_hash || webhookData.email_data?.token_hash || '';
      redirectTo = webhookData.redirect_to || webhookData.email_data?.redirect_to || `${Deno.env.get('SUPABASE_URL')}/auth/callback`;
      emailActionType = webhookData.email_action_type || webhookData.email_data?.email_action_type || 'signup';
      
      console.log('Extracted data:', {
        userEmail,
        token: token ? 'present' : 'missing',
        tokenHash: tokenHash ? 'present' : 'missing',
        redirectTo,
        emailActionType
      });
      
    } catch (error) {
      console.error('Error parsing webhook payload:', error);
      
      // Fallback: try to extract email from the raw payload
      const emailMatch = payload.match(/"email":\s*"([^"]+)"/);
      if (emailMatch) {
        userEmail = emailMatch[1];
        console.log('Extracted email from regex:', userEmail);
      }
    }

    if (!userEmail) {
      console.error('No user email found in webhook payload');
      console.log('Full payload for debugging:', payload);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User email not found in webhook payload',
          debug: { payload: payload.substring(0, 500) }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    console.log(`Sending confirmation email to: ${userEmail}`);

    const html = await renderAsync(
      React.createElement(SignupConfirmationEmail, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token: token,
        token_hash: tokenHash,
        redirect_to: redirectTo,
        email_action_type: emailActionType,
        user_email: userEmail,
      })
    );

    // Use the verified Resend domain to avoid domain verification issues
    const { error } = await resend.emails.send({
      from: 'HopeCore Hub <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Welcome to HopeCore Hub - Confirm Your Account',
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log('Confirmation email sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-confirmation-email function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email',
        details: error.stack || 'No stack trace available'
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    );
  }
});
