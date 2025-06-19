
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export const useMahoroChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Muraho! I'm Mahoro, your supportive AI companion. How can I help you today? You can speak to me in Kinyarwanda, English, Swahili, or French.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const { user, isGuest } = useAuth();

  const sendMessage = useCallback(async (message: string, language: string = 'en') => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Determine user ID - use 'anonymous' for guest users or when no user is authenticated
      const userId = user?.id || (isGuest ? 'guest' : 'anonymous');
      
      console.log('Sending message with user ID:', userId);

      const { data, error } = await supabase.functions.invoke('mahoro-chat', {
        body: {
          message,
          userId,
          sessionId,
          language
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: data.message,
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error: any) {
      console.error('Error sending message:', error);
      
      const errorResponse: ChatMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble responding right now. Please try again in a moment. If you're in crisis, please contact Isange One Stop Center at 3029 or Rwanda National Police at 3512.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach Mahoro AI. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isGuest, sessionId, isLoading]);

  return {
    messages,
    isLoading,
    sendMessage,
    sessionId
  };
};
