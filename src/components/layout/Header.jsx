import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiBell, FiPlus, FiCommand, FiMenu, FiSettings } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import { useTheme } from '../../contexts/ThemeContext'
import './Header.scss'

const Header = ({ title = 'Project Overview', onMenuClick }) => {
  const navigate = useNavigate()
  const { profile } = useTheme()

  return (
    <header className="header">
      <div className="header__left">
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <FiMenu size={20} />
        </button>

        <div className="header-title-block">
          <span className="eyebrow">Workspace</span>
          <h1 className="header-title">{title}</h1>
        </div>

        <div className="search-container">
          <FiSearch className="search-icon" size={16} />
          <input type="text" className="search-input" placeholder="Search tasks, projects (Cmd + K)" />
          <div className="search-shortcut">
            <FiCommand size={10} /> K
          </div>
        </div>
      </div>

      <div className="header__right">
        <div className="header__actions">
          <button className="quick-create-btn" title="Create new task (N)">
            <FiPlus size={16} />
            <span>Quick Create</span>
          </button>

          <div className="divider"></div>

          <ThemeToggle />

          <button className="icon-btn" title="Notifications">
            <FiBell size={18} />
            <span className="notification-dot"></span>
          </button>

          <button
            className="icon-btn"
            title="Open settings"
            aria-label="Open settings"
            onClick={() => navigate('/settings')}
          >
            <FiSettings size={18} />
          </button>
        </div>

        <button className="user-profile-mini" onClick={() => navigate('/settings')} type="button">
          <div className="user-info">
            <span className="user-name">{profile.name}</span>
            <span className="user-role">{profile.role}</span>
          </div>
          <div className="user-avatar">
            <img src={profile.avatar} alt={profile.name} />
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header
