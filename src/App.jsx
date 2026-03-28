import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './components/dashboard/Dashboard'
import KanbanBoard from './components/kanban/KanbanBoard'
import ProjectKanbanBoard from './components/projects/ProjectKanbanBoard'
import WorkspaceProjects from './components/workspace/WorkspaceProjects'
import TasksOverview from './components/tasks/TasksOverview'
import Team from './components/team/Team'
import Activity from './components/activity/Activity'
import './App.scss'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectKanbanBoard />} />
            <Route path="/workspace" element={<WorkspaceProjects />} />
            <Route path="/tasks" element={<TasksOverview />} />
            <Route path="/tasks/:id" element={<TasksOverview />} />
            <Route path="/team" element={<Team />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  )
}

export default App
