import React, { useMemo, useState } from 'react'
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMoon,
  FiSun,
  FiCheck,
  FiBell,
  FiShield,
  FiSave,
} from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'
import './SettingsPage.scss'

const SettingsPage = () => {
  const {
    theme,
    setTheme,
    availableThemes,
    accentColor,
    accentOptions,
    setAccentColor,
    profile,
    updateProfile,
    preferences,
    updatePreferences,
  } = useTheme()

  const [profileDraft, setProfileDraft] = useState(profile)
  const [savedMessage, setSavedMessage] = useState('')

  const themeCards = useMemo(
    () => [
      {
        id: 'light',
        label: 'Light',
        description: 'Bright surfaces with crisp contrast for daytime planning.',
        icon: FiSun,
      },
      {
        id: 'dark',
        label: 'Dark',
        description: 'Low-glare workspace for focused sessions and late hours.',
        icon: FiMoon,
      },
    ].filter((item) => availableThemes.includes(item.id)),
    [availableThemes],
  )

  const handleProfileInputChange = (event) => {
    const { name, value } = event.target
    setProfileDraft((current) => ({
      ...current,
      [name]: value,
    }))
    setSavedMessage('')
  }

  const handleSaveProfile = (event) => {
    event.preventDefault()
    updateProfile(profileDraft)
    setSavedMessage('Profile updated and saved locally.')
  }

  const handleTogglePreference = (key) => {
    updatePreferences({
      [key]: !preferences[key],
    })
  }

  return (
    <div className="settings-page">
      <section className="settings-page__hero">
        <div className="hero-copy">
          <span className="hero-kicker">Settings</span>
          <h1>Personalize your workspace and keep your profile up to date.</h1>
          <p>
            Control your appearance, notification behavior, and the details teammates see across
            the app.
          </p>
        </div>
        <div className="hero-profile card">
          <img src={profileDraft.avatar} alt={profileDraft.name} className="hero-avatar" />
          <div>
            <h2>{profileDraft.name}</h2>
            <p>{profileDraft.role}</p>
            <span>{profileDraft.email}</span>
          </div>
        </div>
      </section>

      <div className="settings-grid">
        <section className="settings-card settings-card--profile">
          <div className="card-header">
            <div>
              <span className="section-label">Profile</span>
              <h3>Your Details</h3>
            </div>
            <div className="header-icon">
              <FiUser size={18} />
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSaveProfile}>
            <div className="form-grid">
              <label className="field">
                <span>Full Name</span>
                <div className="field-input">
                  <FiUser size={16} />
                  <input
                    name="name"
                    value={profileDraft.name}
                    onChange={handleProfileInputChange}
                    placeholder="Your name"
                  />
                </div>
              </label>

              <label className="field">
                <span>Role</span>
                <div className="field-input">
                  <FiShield size={16} />
                  <input
                    name="role"
                    value={profileDraft.role}
                    onChange={handleProfileInputChange}
                    placeholder="Your role"
                  />
                </div>
              </label>

              <label className="field">
                <span>Email</span>
                <div className="field-input">
                  <FiMail size={16} />
                  <input
                    name="email"
                    type="email"
                    value={profileDraft.email}
                    onChange={handleProfileInputChange}
                    placeholder="name@company.com"
                  />
                </div>
              </label>

              <label className="field">
                <span>Phone</span>
                <div className="field-input">
                  <FiPhone size={16} />
                  <input
                    name="phone"
                    value={profileDraft.phone}
                    onChange={handleProfileInputChange}
                    placeholder="+1 (555) 555-5555"
                  />
                </div>
              </label>

              <label className="field">
                <span>Location</span>
                <div className="field-input">
                  <FiMapPin size={16} />
                  <input
                    name="location"
                    value={profileDraft.location}
                    onChange={handleProfileInputChange}
                    placeholder="City, Country"
                  />
                </div>
              </label>

              <label className="field">
                <span>Timezone</span>
                <div className="field-input">
                  <FiClock size={16} />
                  <input
                    name="timezone"
                    value={profileDraft.timezone}
                    onChange={handleProfileInputChange}
                    placeholder="Timezone"
                  />
                </div>
              </label>
            </div>

            <label className="field field--full">
              <span>Bio</span>
              <textarea
                name="bio"
                rows={4}
                value={profileDraft.bio}
                onChange={handleProfileInputChange}
                placeholder="Tell your team a little about what you focus on."
              />
            </label>

            <label className="field field--full">
              <span>Avatar URL</span>
              <input
                name="avatar"
                value={profileDraft.avatar}
                onChange={handleProfileInputChange}
                placeholder="https://..."
              />
            </label>

            <div className="form-footer">
              {savedMessage ? <p className="saved-message">{savedMessage}</p> : <span />}
              <button className="save-btn" type="submit">
                <FiSave size={16} />
                Save Profile
              </button>
            </div>
          </form>
        </section>

        <section className="settings-card">
          <div className="card-header">
            <div>
              <span className="section-label">Appearance</span>
              <h3>Theme & Accent</h3>
            </div>
            <div className="header-icon">
              <FiSun size={18} />
            </div>
          </div>

          <div className="theme-options">
            {themeCards.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`theme-option ${theme === option.id ? 'is-active' : ''}`}
                  onClick={() => setTheme(option.id)}
                >
                  <div className="theme-option__icon">
                    <Icon size={18} />
                  </div>
                  <div className="theme-option__copy">
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </div>
                  {theme === option.id && <FiCheck size={16} className="selection-check" />}
                </button>
              )
            })}
          </div>

          <div className="accent-picker">
            <div className="accent-header">
              <h4>Accent Color</h4>
              <p>Choose the highlight color used across actions, focus states, and emphasis.</p>
            </div>

            <div className="accent-swatches">
              {accentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`accent-swatch ${accentColor === option.id ? 'is-active' : ''}`}
                  onClick={() => setAccentColor(option.id)}
                >
                  <span className="swatch-color" style={{ background: option.primary }} />
                  <span className="swatch-name">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="card-header">
            <div>
              <span className="section-label">Preferences</span>
              <h3>Notifications & Privacy</h3>
            </div>
            <div className="header-icon">
              <FiBell size={18} />
            </div>
          </div>

          <div className="preference-list">
            <button
              type="button"
              className={`preference-row ${preferences.emailNotifications ? 'is-enabled' : ''}`}
              onClick={() => handleTogglePreference('emailNotifications')}
            >
              <div>
                <strong>Email notifications</strong>
                <span>Receive task updates and mentions in your inbox.</span>
              </div>
              <span className="preference-state">{preferences.emailNotifications ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              className={`preference-row ${preferences.pushNotifications ? 'is-enabled' : ''}`}
              onClick={() => handleTogglePreference('pushNotifications')}
            >
              <div>
                <strong>Push notifications</strong>
                <span>Show immediate alerts for comments, approvals, and due dates.</span>
              </div>
              <span className="preference-state">{preferences.pushNotifications ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              className={`preference-row ${preferences.weeklyDigest ? 'is-enabled' : ''}`}
              onClick={() => handleTogglePreference('weeklyDigest')}
            >
              <div>
                <strong>Weekly digest</strong>
                <span>Get a summary of project movement, blockers, and team progress.</span>
              </div>
              <span className="preference-state">{preferences.weeklyDigest ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              className={`preference-row ${preferences.publicProfile ? 'is-enabled' : ''}`}
              onClick={() => handleTogglePreference('publicProfile')}
            >
              <div>
                <strong>Visible profile details</strong>
                <span>Let teammates see your contact details and working location.</span>
              </div>
              <span className="preference-state">{preferences.publicProfile ? 'On' : 'Off'}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
