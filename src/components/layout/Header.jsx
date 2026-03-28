import React from 'react'
import { FiSearch, FiBell, FiPlus, FiCommand, FiMenu } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import './Header.scss'

const Header = ({ title = "Project Overview", onMenuClick }) => {
  return (
    <header className="header">
      <div className="header__left">
        <button 
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FiMenu size={20} />
        </button>
        
        <div className="search-container">
          <FiSearch className="search-icon" size={16} />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search tasks, projects (Cmd + K)"
          />
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
        </div>

        <div className="user-profile-mini">
          <div className="user-info">
            <span className="user-name">Alex Rivera</span>
            <span className="user-role">Lead Designer</span>
          </div>
          <div className="user-avatar">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEzucP8SEaQ7I0sK5GpbVfGF0Z9w6QsuFn1fquFVEumUzPkbesEtMAyeEfHl16_OgEmK5JHOlsARpkXjfnrGjVkagQl3nOfo01R2b9q9CD1K3OEj368SjSd6kvIMI_s40rL7yL2erWVd3LGEzRPkNOqGQn6aTU7PrEPHYXuO4k_PEUGjOKKRiKfJEFYZ4ilFf2ZTQ5grwXAXJWCTlos4VPxZSFERR16wB9Y98tq45oA1oS7tYjuE66UWqCoZ-DHq8072F-swj9DA"
              alt="User profile"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
