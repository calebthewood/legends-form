import { useState, useEffect } from "react";
import { supabase } from '../db';

/**
 * Prototype for a supabase custom hook, need more practice w/ the api to build a sufficiently general implementation.
 */
export function useSupabase(tableName: string, select: string) {
  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    async function fetchActivities() {
      const response = await supabase.from(tableName).select(select);
      setActivities(response?.data?.[0] ?? []);
    }
    fetchActivities();
  }, [tableName, select]);

  return activities;
}
