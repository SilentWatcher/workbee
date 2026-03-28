import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Sidebar from './Sidebar'
import Header from './Header'
import './AppLayout.scss'

const AppLayout = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Determine header title based on current path
  const getHeaderTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Project Overview'
    if (path === '/projects') return 'Project Kanban Board'
    if (path === '/workspace') return 'Workspace Projects'
    if (path === '/tasks') return 'Tasks Overview'
    if (path.startsWith('/tasks/')) return 'Task Details'
    return 'Work Bee'
  }

  return (
    <div className="app">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar className={sidebarOpen ? 'sidebar--open' : ''} />
      
      <div className="app__main">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </div>
    </div>
  )
}

export default AppLayout
