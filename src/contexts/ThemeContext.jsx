/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { THEMES, THEME_CONFIG } from '../config/themes'

const ThemeContext = createContext()

const ACCENT_OPTIONS = [
  {
    id: 'indigo',
    name: 'Indigo',
    primary: '#4f46e5',
    primaryContainer: '#eef2ff',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#3730a3',
    inversePrimary: '#818cf8',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primary: '#059669',
    primaryContainer: '#d1fae5',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#065f46',
    inversePrimary: '#34d399',
  },
  {
    id: 'rose',
    name: 'Rose',
    primary: '#e11d48',
    primaryContainer: '#ffe4e6',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#9f1239',
    inversePrimary: '#fb7185',
  },
  {
    id: 'amber',
    name: 'Amber',
    primary: '#d97706',
    primaryContainer: '#fef3c7',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#92400e',
    inversePrimary: '#fbbf24',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    primary: '#0891b2',
    primaryContainer: '#cffafe',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#155e75',
    inversePrimary: '#22d3ee',
  },
]

const DEFAULT_PROFILE = {
  name: 'Alex Rivera',
  role: 'Lead Designer',
  email: 'alex.rivera@workbee.app',
  phone: '+1 (415) 555-0198',
  location: 'San Francisco, CA',
  timezone: 'Pacific Time (PT)',
  bio: 'Leading product design systems, cross-functional planning, and shipping details that scale.',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDEzucP8SEaQ7I0sK5GpbVfGF0Z9w6QsuFn1fquFVEumUzPkbesEtMAyeEfHl16_OgEmK5JHOlsARpkXjfnrGjVkagQl3nOfo01R2b9q9CD1K3OEj368SjSd6kvIMI_s40rL7yL2erWVd3LGEzRPkNOqGQn6aTU7PrEPHYXuO4k_PEUGjOKKRiKfJEFYZ4ilFf2ZTQ5grwXAXJWCTlos4VPxZSFERR16wB9Y98tq45oA1oS7tYjuE66UWqCoZ-DHq8072F-swj9DA',
}

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  publicProfile: false,
}

const applyAccentToRoot = (accentId, themeName) => {
  const accent = ACCENT_OPTIONS.find((option) => option.id === accentId) || ACCENT_OPTIONS[0]
  const root = document.documentElement
  const onPrimaryContainer =
    themeName === 'dark' ? accent.primaryContainer : accent.onPrimaryContainer
  const primaryContainer =
    themeName === 'dark' ? accent.onPrimaryContainer : accent.primaryContainer

  root.style.setProperty('--primary', accent.primary)
  root.style.setProperty('--primary-container', primaryContainer)
  root.style.setProperty('--on-primary', accent.onPrimary)
  root.style.setProperty('--on-primary-container', onPrimaryContainer)
  root.style.setProperty('--inverse-primary', accent.inversePrimary)
  root.style.setProperty('--accent', accent.primary)
  root.style.setProperty('--accent-soft', accent.primaryContainer)
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_CONFIG.localStorageKey)
    if (savedTheme && THEMES[savedTheme]) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : THEME_CONFIG.defaultTheme
  })

  const [accentColor, setAccentColorState] = useState(
    () => localStorage.getItem(THEME_CONFIG.accentStorageKey) || ACCENT_OPTIONS[0].id,
  )
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem(THEME_CONFIG.profileStorageKey)
    return savedProfile ? JSON.parse(savedProfile) : DEFAULT_PROFILE
  })
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem(THEME_CONFIG.preferencesStorageKey)
    return savedPreferences ? JSON.parse(savedPreferences) : DEFAULT_PREFERENCES
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    const themeData = THEMES[theme]
    if (themeData) {
      const root = document.documentElement
      Object.entries(themeData.colors).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVar, value)
      })

      const surface = themeData.colors.surface
      const onSurface = themeData.colors.onSurface
      root.style.backgroundColor = surface
      root.style.color = onSurface
      document.body.style.backgroundColor = surface
      document.body.style.color = onSurface
    }

    applyAccentToRoot(accentColor, theme)
    localStorage.setItem(THEME_CONFIG.localStorageKey, theme)
  }, [theme, accentColor])

  useEffect(() => {
    localStorage.setItem(THEME_CONFIG.accentStorageKey, accentColor)
  }, [accentColor])

  useEffect(() => {
    localStorage.setItem(THEME_CONFIG.profileStorageKey, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    localStorage.setItem(THEME_CONFIG.preferencesStorageKey, JSON.stringify(preferences))
  }, [preferences])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const availableThemes = Object.keys(THEMES)
      const currentIndex = availableThemes.indexOf(prevTheme)
      const nextIndex = (currentIndex + 1) % availableThemes.length
      return availableThemes[nextIndex]
    })
  }

  const setSpecificTheme = (themeName) => {
    if (THEMES[themeName]) {
      setTheme(themeName)
    }
  }

  const setAccentColor = (accentId) => {
    if (ACCENT_OPTIONS.some((option) => option.id === accentId)) {
      setAccentColorState(accentId)
    }
  }

  const updateProfile = (nextProfile) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...nextProfile,
    }))
  }

  const updatePreferences = (nextPreferences) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      ...nextPreferences,
    }))
  }

  const value = useMemo(
    () => ({
      theme,
      themeData: THEMES[theme],
      availableThemes: Object.keys(THEMES),
      toggleTheme,
      setTheme: setSpecificTheme,
      accentColor,
      accentOptions: ACCENT_OPTIONS,
      setAccentColor,
      profile,
      updateProfile,
      preferences,
      updatePreferences,
      config: THEME_CONFIG,
    }),
    [theme, accentColor, profile, preferences],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
