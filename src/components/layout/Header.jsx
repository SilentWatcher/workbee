import React from 'react'
import { FiSearch, FiBell, FiMessageSquare, FiGrid, FiMenu } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import './Header.scss'

const Header = ({ title = "Project Overview", onMenuClick }) => {
  return (
    <header className="header">
      <div className="header__left">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FiMenu size={20} />
        </button>
        
        {/* <h1 className="page-title">{title}</h1> */}
        
        <div className="search-container">
          <FiSearch className="search-icon" size={16} />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search projects, tasks, or team..."
          />
        </div>
      </div>

      <div className="header__right">
        <nav className="nav-links">
          <a href="#" className="nav-link">My Tasks</a>
          <a href="#" className="nav-link nav-link--active">Team</a>
          <a href="#" className="nav-link">Timeline</a>
        </nav>

        <div className="divider"></div>

        <div className="action-buttons">
          <ThemeToggle />
          <button className="action-btn" title="Notifications">
            <FiBell size={20} />
          </button>
          <button className="action-btn" title="Messages">
            <FiMessageSquare size={20} />
          </button>
          <button className="action-btn" title="Apps">
            <FiGrid size={20} />
          </button>
        </div>

        <div className="user-menu">
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
