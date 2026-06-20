'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { AppLang, t } from '@/lib/app-i18n'

const LS_KEY = 'bf_app_lang'

function getBrowserLang(): AppLang {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(LS_KEY) as AppLang | null
  if (stored && ['en','de','fr','es'].includes(stored)) return stored
  const nav = navigator.language.split('-')[0]
  if (['de','fr','es'].includes(nav)) return nav as AppLang
  return 'en'
}

export function useAppLang() {
  const [lang, setLangState] = useState<AppLang>('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      // First use browser/localStorage as fast default
      const local = getBrowserLang()
      setLangState(local)

      // Then check profile for saved preference
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('app_lang')
          .eq('id', user.id)
          .single()
        if (data?.app_lang && ['en','de','fr','es'].includes(data.app_lang)) {
          setLangState(data.app_lang as AppLang)
          localStorage.setItem(LS_KEY, data.app_lang)
        }
      }
      setReady(true)
    }
    init()
  }, [])

  const setLang = useCallback(async (newLang: AppLang) => {
    setLangState(newLang)
    localStorage.setItem(LS_KEY, newLang)
    // Save to profile
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ app_lang: newLang }).eq('id', user.id)
    }
  }, [])

  return { lang, setLang, tr: t[lang], ready }
}
