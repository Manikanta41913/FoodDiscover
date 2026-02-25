import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nieakitdretjgrzxxifi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZWFraXRkcmV0amdyenh4aWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzUxMTUsImV4cCI6MjA4NDc1MTExNX0.5Fp4BpMZOE1HHNTAaMBBA44BJcMJwSHVoAcXEG3GMAs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
