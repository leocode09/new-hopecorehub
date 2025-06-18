
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface SignupConfirmationEmailProps {
  supabase_url: string;
  email_action_type: string;
  redirect_to: string;
  token_hash: string;
  token: string;
  user_email: string;
}

export const SignupConfirmationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: SignupConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to HopeCore Hub - Confirm your account</Preview>
    <Body style={main}>
      <Container style={container}>
        <div style={logoContainer}>
          <div style={logo}>🛡️</div>
          <Heading style={h1}>HopeCore Hub</Heading>
        </div>
        
        <Text style={greeting}>Welcome to your safe space!</Text>
        
        <Text style={text}>
          Thank you for joining HopeCore Hub. To complete your registration and start your healing journey, 
          please confirm your email address by clicking the button below:
        </Text>
        
        <Link
          href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          target="_blank"
          style={button}
        >
          Confirm Your Account
        </Link>
        
        <Text style={text}>
          Or copy and paste this confirmation code if the button doesn't work:
        </Text>
        <code style={code}>{token}</code>
        
        <Text style={inspirationalText}>
          <em>"Healing Begins When The Silence Ends"</em>
        </Text>
        
        <Text style={supportText}>
          Remember, this is your safe space. All forum posts are anonymous by default, 
          and your privacy is our top priority. If you need immediate support, 
          our platform includes crisis resources and AI support.
        </Text>
        
        <Text style={footerText}>
          If you didn't sign up for HopeCore Hub, you can safely ignore this email.
        </Text>
        
        <Text style={footer}>
          With love and support,<br />
          <strong>The HopeCore Hub Team</strong><br />
          Your journey to healing starts here 💜
        </Text>
      </Container>
    </Body>
  </Html>
);

export default SignupConfirmationEmail;

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 20px 48px',
  maxWidth: '560px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  marginTop: '40px',
  marginBottom: '40px',
};

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  display: 'inline-block',
  width: '60px',
  height: '60px',
  backgroundColor: '#9E78E9',
  borderRadius: '50%',
  fontSize: '28px',
  lineHeight: '60px',
  color: '#ffffff',
  marginBottom: '16px',
};

const h1 = {
  color: '#9E78E9',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
};

const greeting = {
  fontSize: '18px',
  color: '#1e293b',
  margin: '24px 0',
  textAlign: 'center' as const,
  fontWeight: '600',
};

const text = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const button = {
  backgroundColor: '#9E78E9',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '16px 32px',
  margin: '32px 0',
};

const code = {
  display: 'inline-block',
  padding: '16px',
  width: '100%',
  backgroundColor: '#f1f5f9',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontFamily: 'monospace',
  fontSize: '14px',
  color: '#475569',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const inspirationalText = {
  color: '#9E78E9',
  fontSize: '16px',
  textAlign: 'center' as const,
  margin: '32px 0',
  fontStyle: 'italic',
};

const supportText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0',
  padding: '16px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #9E78E9',
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  margin: '24px 0 16px',
};

const footer = {
  color: '#9E78E9',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '32px 0 0',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '24px',
};
