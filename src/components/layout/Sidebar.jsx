import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiGrid, 
  FiFolder, 
  FiCheckSquare, 
  FiLayout, 
  FiSettings, 
  FiHelpCircle, 
  FiTool, 
  FiPlus
} from 'react-icons/fi'
import './Sidebar.scss'

const Sidebar = ({ className = '' }) => {
  const location = useLocation()

  const navigationItems = [
    { icon: FiGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: FiFolder, label: 'Projects', path: '/projects' },
    { icon: FiCheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: FiLayout, label: 'Workspace', path: '/workspace' },
  ]

  const footerItems = [
    { icon: FiSettings, label: 'Settings', path: '/settings' },
    { icon: FiHelpCircle, label: 'Help', path: '/help' },
  ]

  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/')
  }

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__brand">
        <div className="brand">
          <div className="brand__logo">
            <div className="logo">
              <FiTool size={20} />
            </div>
            <div className="title">
              <h1>Precision PM</h1>
              <p>The Workspace</p>
            </div>
          </div>
          <Link to="/projects" className="new-project-btn">
            <FiPlus size={16} />
            New Project
          </Link>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="nav__list">
          {navigationItems.map((item, index) => (
            <li key={index} className="nav__item">
              <Link 
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}
              >
                <item.icon className="icon" size={20} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <nav className="footer-nav">
          <ul className="footer-nav__list">
            {footerItems.map((item, index) => (
              <li key={index} className="footer-nav__item">
                <Link to={item.path} className="footer-link">
                  <item.icon className="icon" size={20} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="user-profile">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG_8wrdkSD7rqkRlMSM6-qbhl2Y7EaEV30ZAs-unmrc5-9gWr8p3Mkn64qp8Htx6nxVIQ4Jbsoptdf5QKD90nmUUBg1PC0N3DtKKLKHsrA-Lb9rQwTgAoKwBebiPyc1Layoiox4H2GS2bJhcqpzXpjv3L7oKBiN8TXabOK8vLpUpRGyyDIMsPi5yL3DPqgLIbPXNHDQbInSnyEO7EU0oYM9xN2zggmM0w4dTzM_PeIb5UvTdKAxUxjn3YBA0Rs3NS5NPYlwShhVQ"
            alt="Alex Rivera" 
            className="avatar"
          />
          <div className="user-info">
            <p className="name">Alex Rivera</p>
            <p className="role">Lead Designer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
