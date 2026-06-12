'use client'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// A single shared browser client. Defining the client once (module singleton)
// and importing it everywhere avoids the "Multiple GoTrueClient instances"
// problem, where several clients race over the same auth storage key and the
// session intermittently fails to attach to requests.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseBrowser: SupabaseClient =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : (null as any)
