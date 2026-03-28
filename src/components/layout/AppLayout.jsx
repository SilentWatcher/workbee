import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Sidebar from './Sidebar'
import Header from './Header'
import { fetchProjects } from '../../features/projects/projectsSlice'
import { fetchTasks } from '../../features/tasks/tasksSlice'
import { fetchKanbanData } from '../../features/kanban/kanbanSlice'
import './AppLayout.scss'

const AppLayout = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const projectsStatus = useSelector((state) => state.projects.status)
  const tasksStatus = useSelector((state) => state.tasks.status)
  const kanbanStatus = useSelector((state) => state.kanban.status)

  useEffect(() => {
    // Initialize data
    if (projectsStatus === 'idle') {
      dispatch(fetchProjects())
    }
    if (tasksStatus === 'idle') {
      dispatch(fetchTasks())
    }
    if (kanbanStatus === 'idle') {
      dispatch(fetchKanbanData())
    }
  }, [dispatch, projectsStatus, tasksStatus, kanbanStatus])

  const isLoading = projectsStatus === 'loading' || tasksStatus === 'loading' || kanbanStatus === 'loading'

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
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar className={sidebarOpen ? 'sidebar--open' : ''} />
      
      <div className="app__main">
        <Header title={getHeaderTitle()} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '60vh',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div className="spinning">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeDasharray="31.416"
                  strokeDashoffset="31.416"
                  opacity="0.2"
                />
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeDasharray="31.416"
                  strokeDashoffset="23.562"
                  className="spinning"
                />
              </svg>
            </div>
            <p className="body-md text-on-surface-variant">Loading Work Bee...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default AppLayout
