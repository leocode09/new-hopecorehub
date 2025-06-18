
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface UserPreferences {
  id?: string;
  user_id: string;
  low_data_mode: boolean;
  onboarding_completed: boolean;
  lazy_loading_enabled: boolean;
  offline_mode_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPreferences = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Create default preferences
        const defaultPrefs: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'> = {
          user_id: user.id,
          low_data_mode: false,
          onboarding_completed: false,
          lazy_loading_enabled: true,
          offline_mode_enabled: false,
        };

        const { data: newData, error: createError } = await supabase
          .from('user_preferences')
          .insert(defaultPrefs)
          .select()
          .single();

        if (createError) throw createError;
        setPreferences(newData);
      } else {
        setPreferences(data);
      }
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
      toast({
        title: "Error loading preferences",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return false;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error: any) {
      toast({
        title: "Error updating preferences",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    loading,
    updatePreferences,
    refreshPreferences: fetchPreferences
  };
};
