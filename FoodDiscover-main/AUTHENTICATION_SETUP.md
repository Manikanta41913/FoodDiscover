# Authentication Setup Guide

## Issue: "Failed to fetch" during signup

This error typically occurs due to one of these reasons:

### 1. Supabase Project Issues
The hardcoded Supabase credentials might be:
- From an expired/deleted project
- Not properly configured for authentication
- Missing required database tables

### 2. CORS Issues
The Supabase project might not allow requests from your domain.

### 3. Network Issues
Firewall or network blocking the Supabase API.

---

## Solution Options

### Option A: Create Your Own Supabase Project (Recommended)

1. Go to [https://supabase.com](https://supabase.com) and create a free account

2. Create a new project

3. Go to Project Settings → API and copy:
   - Project URL
   - Anon/Public Key

4. Update `.env` file:
   ```env
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   ```

5. Set up authentication in Supabase:
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

6. Create required database tables (optional for user profiles):
   ```sql
   -- Run this in SQL Editor
   create table user_profiles (
     id uuid references auth.users on delete cascade primary key,
     full_name text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table user_profiles enable row level security;

   -- Create policy to allow users to read their own profile
   create policy "Users can view own profile"
     on user_profiles for select
     using (auth.uid() = id);

   -- Create policy to allow users to insert their own profile
   create policy "Users can insert own profile"
     on user_profiles for insert
     with check (auth.uid() = id);
   ```

7. Restart your development server:
   ```bash
   npm start
   ```

### Option B: Disable Authentication Temporarily

If you want to test the app without authentication:

1. Comment out authentication requirements in components
2. Use the app without login/signup features
3. Cart will work with local Redux state only (no persistence)

### Option C: Use Mock Authentication

Create a mock auth provider for local development without a backend.

---

## Testing the Fix

After setting up:

1. Clear browser cache and localStorage
2. Try signing up with a new email
3. Check browser console for detailed error messages
4. Check Supabase dashboard → Authentication → Users to see if user was created

---

## Common Errors and Solutions

### "Invalid API key"
- Your Supabase anon key is incorrect
- Copy the correct key from Supabase dashboard

### "Email not confirmed"
- Check Supabase → Authentication → Settings
- Disable "Confirm email" for testing
- Or check your email for confirmation link

### "User already registered"
- Try logging in instead of signing up
- Or use a different email address

### Network/CORS errors
- Check if Supabase project is active
- Verify your internet connection
- Check browser console for CORS errors
- Add your domain to Supabase allowed origins (if deployed)

---

## Current Configuration

The app now:
- Uses environment variables from `.env` file
- Falls back to hardcoded values if env vars not found
- Has better error handling with network error messages
- Won't crash if user_profiles table doesn't exist
