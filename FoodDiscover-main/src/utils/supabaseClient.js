import { createClient } from '@supabase/supabase-js'

// Use environment variables if available, otherwise fall back to hardcoded values
const supabaseUrl = process.env.SUPABASE_URL || 'https://nieakitdretjgrzxxifi.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZWFraXRkcmV0amdyenh4aWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzUxMTUsImV4cCI6MjA4NDc1MTExNX0.5Fp4BpMZOE1HHNTAaMBBA44BJcMJwSHVoAcXEG3GMAs'

// Check if Supabase is properly configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
