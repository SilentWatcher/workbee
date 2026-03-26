import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './components/dashboard/Dashboard'
import KanbanBoard from './components/kanban/KanbanBoard'
import ProjectKanbanBoard from './components/projects/ProjectKanbanBoard'
import WorkspaceProjects from './components/workspace/WorkspaceProjects'
import TasksOverview from './components/tasks/TasksOverview'
import './App.scss'

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectKanbanBoard />} />
          <Route path="/workspace" element={<WorkspaceProjects />} />
          <Route path="/tasks" element={<TasksOverview />} />
          <Route path="/tasks/:id" element={<TasksOverview />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
