
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
    
    // If webhook secret is configured, verify the webhook
    if (hookSecret) {
      const wh = new Webhook(hookSecret);
      try {
        const {
          user,
          email_data: { token, token_hash, redirect_to, email_action_type },
        } = wh.verify(payload, headers) as {
          user: { email: string };
          email_data: {
            token: string;
            token_hash: string;
            redirect_to: string;
            email_action_type: string;
          };
        };

        console.log(`Sending confirmation email to: ${user.email}`);

        const html = await renderAsync(
          React.createElement(SignupConfirmationEmail, {
            supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
            token,
            token_hash,
            redirect_to: redirect_to || `${Deno.env.get('SUPABASE_URL')}/auth/callback`,
            email_action_type,
            user_email: user.email,
          })
        );

        const { error } = await resend.emails.send({
          from: 'HopeCore Hub <noreply@hopecorehub.com>',
          to: [user.email],
          subject: 'Welcome to HopeCore Hub - Confirm Your Account',
          html,
        });

        if (error) {
          console.error('Resend error:', error);
          throw error;
        }

        console.log('Confirmation email sent successfully');
      } catch (webhookError) {
        console.error('Webhook verification failed:', webhookError);
        throw new Error('Invalid webhook signature');
      }
    } else {
      // Fallback for direct API calls (for testing)
      const body = JSON.parse(payload);
      const { email, token, token_hash, redirect_to, email_action_type } = body;

      console.log(`Sending confirmation email to: ${email}`);

      const html = await renderAsync(
        React.createElement(SignupConfirmationEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to: redirect_to || `${Deno.env.get('SUPABASE_URL')}/auth/callback`,
          email_action_type: email_action_type || 'signup',
          user_email: email,
        })
      );

      const { error } = await resend.emails.send({
        from: 'HopeCore Hub <noreply@hopecorehub.com>',
        to: [email],
        subject: 'Welcome to HopeCore Hub - Confirm Your Account',
        html,
      });

      if (error) {
        console.error('Resend error:', error);
        throw error;
      }

      console.log('Confirmation email sent successfully');
    }

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
