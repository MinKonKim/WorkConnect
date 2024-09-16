import { createClient } from '@/utils/supabase/supabaseServer';

export const getActivityScheduler = async () => {
  const supabase = createClient();

  const response = await supabase.from('scheduler_db').select('*').eq('id', 1).single();

  return response;
};
