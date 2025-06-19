
import React from 'npm:react@18.3.1';
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'npm:resend@4.0.0';

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
    console.log('Webhook payload received:', payload);

    let userEmail: string = '';

    // Parse the webhook payload
    try {
      const webhookData = JSON.parse(payload);
      console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2));
      
      userEmail = webhookData.user?.email || 
                  webhookData.record?.email || 
                  webhookData.email_data?.user?.email ||
                  webhookData.email;
      
      console.log('Extracted email:', userEmail);
      
    } catch (error) {
      console.error('Error parsing webhook payload:', error);
      const emailMatch = payload.match(/"email":\s*"([^"]+)"/);
      if (emailMatch) {
        userEmail = emailMatch[1];
        console.log('Extracted email from regex:', userEmail);
      }
    }

    if (!userEmail) {
      console.error('No user email found in webhook payload');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User email not found in webhook payload'
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

    console.log(`Email confirmation disabled - skipping email send for: ${userEmail}`);

    // Return success without sending any email (email confirmation disabled)
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email confirmation disabled - account ready for use',
        note: 'User can sign in immediately without email confirmation'
      }),
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
        error: error.message || 'Failed to process email confirmation'
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
