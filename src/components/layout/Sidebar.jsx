import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiGrid, 
  FiFolder, 
  FiCheckSquare, 
  FiLayout, 
  FiSettings, 
  FiHelpCircle, 
  FiPlus,
  FiBox,
  FiZap,
  FiUsers
} from 'react-icons/fi'
import './Sidebar.scss'

const Sidebar = ({ className = '' }) => {
  const location = useLocation()

  const navigationItems = [
    { icon: FiGrid, label: 'Overview', path: '/dashboard' },
    { icon: FiFolder, label: 'Projects', path: '/projects' },
    { icon: FiCheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: FiLayout, label: 'Workspaces', path: '/workspace' },
  ]

  const teamItems = [
    { icon: FiUsers, label: 'Team', path: '/team' },
    { icon: FiZap, label: 'Activity', path: '/activity' },
  ]

  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/')
  }

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__brand">
        <div className="brand-logo">
          <FiBox size={24} />
        </div>
        <div className="brand-name">
          <h1>Work Bee</h1>
          <span className="brand-badge">Pro</span>
        </div>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__section">
          <p className="section-label">Main</p>
          <nav className="sidebar__nav">
            <ul className="nav-list">
              {navigationItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}
                  >
                    <item.icon className="icon" size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sidebar__section">
          <p className="section-label">Collaboration</p>
          <nav className="sidebar__nav">
            <ul className="nav-list">
              {teamItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}
                  >
                    <item.icon className="icon" size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sidebar__footer">
        <button className="new-project-btn">
          <FiPlus size={16} />
          <span>New Project</span>
        </button>
        
        <nav className="footer-nav">
          <Link to="/settings" className="footer-link" title="Settings">
            <FiSettings size={18} />
          </Link>
          <Link to="/help" className="footer-link" title="Help Center">
            <FiHelpCircle size={18} />
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
