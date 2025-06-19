
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
    
    let userEmail: string;
    let token: string;
    let tokenHash: string;
    let redirectTo: string;
    let emailActionType: string;

    // If webhook secret is configured, verify the webhook
    if (hookSecret) {
      try {
        const webhookData = new Webhook(hookSecret).verify(payload, headers) as any;
        console.log('Webhook data:', JSON.stringify(webhookData, null, 2));
        
        userEmail = webhookData.user?.email;
        token = webhookData.email_data?.token;
        tokenHash = webhookData.email_data?.token_hash;
        redirectTo = webhookData.email_data?.redirect_to;
        emailActionType = webhookData.email_data?.email_action_type;
        
        if (!userEmail) {
          console.error('No user email found in webhook payload');
          throw new Error('User email not found in webhook payload');
        }
      } catch (webhookError) {
        console.error('Webhook verification failed:', webhookError);
        throw new Error('Invalid webhook signature or payload');
      }
    } else {
      // Fallback for direct API calls (for testing)
      const body = JSON.parse(payload);
      userEmail = body.email;
      token = body.token;
      tokenHash = body.token_hash;
      redirectTo = body.redirect_to;
      emailActionType = body.email_action_type || 'signup';
    }

    if (!userEmail) {
      console.error('User email is required but not provided');
      throw new Error('User email is required');
    }

    console.log(`Sending confirmation email to: ${userEmail}`);

    const html = await renderAsync(
      React.createElement(SignupConfirmationEmail, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token: token || '',
        token_hash: tokenHash || '',
        redirect_to: redirectTo || `${Deno.env.get('SUPABASE_URL')}/auth/callback`,
        email_action_type: emailActionType || 'signup',
        user_email: userEmail,
      })
    );

    const { error } = await resend.emails.send({
      from: 'HopeCore Hub <noreply@hopecorehub.com>',
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
        error: error.message || 'Failed to send email' 
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
