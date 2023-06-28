import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bziofsjhtovijyssjcxb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aW9mc2podG92aWp5c3NqY3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NzY3MTMsImV4cCI6MjAwMzU1MjcxM30._wxuq3cfGsRuc10BVNjDVXCvwCK8_xic_cN9viegWw8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
