import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mompgmwmfzckwxlfgyen.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_YYA3d9yNciBEDD-iNHchNA_y0yfUj8e";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
