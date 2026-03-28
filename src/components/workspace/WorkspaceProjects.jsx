import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPlus, 
  FiSearch, 
  FiChevronRight, 
  FiArrowLeft,
  FiTrash2,
  FiCheckCircle,
  FiCircle,
  FiCalendar,
  FiLayers,
  FiBriefcase,
  FiCheckSquare,
  FiEdit2,
  FiX
} from 'react-icons/fi'
import { 
  fetchWorkspaces, 
  setSelectedWorkspaceId, 
  createWorkspace, 
  deleteWorkspace 
} from '../../features/workspace/workspaceSlice'
import { 
  fetchProjects, 
  setSelectedProjectId, 
  createProject, 
  deleteProject 
} from '../../features/projects/projectsSlice'
import { 
  fetchTasks, 
  createTask, 
  deleteTask, 
  toggleSubtask,
  updateTask
} from '../../features/tasks/tasksSlice'
import './WorkspaceProjects.scss'

const WorkspaceProjects = () => {
  const dispatch = useDispatch()
  
  // Redux state
  const { workspaces, selectedWorkspaceId, status: workspacesStatus } = useSelector(state => state.workspaces)
  const { projects, selectedProjectId, status: projectsStatus } = useSelector(state => state.projects)
  const { tasks, status: tasksStatus } = useSelector(state => state.tasks)
  
  // Local state
  const [view, setView] = useState('workspaces') // 'workspaces', 'projects', 'tasks'
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' or 'edit'
  const [modalType, setModalType] = useState('') // 'workspace', 'project', 'task'
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', title: '', description: '', priority: 'medium', dueDate: '' })

  useEffect(() => {
    dispatch(fetchWorkspaces())
    dispatch(fetchProjects())
    dispatch(fetchTasks())
  }, [dispatch])

  // Computed data
  const currentWorkspace = useMemo(() => 
    workspaces.find(w => w.id === selectedWorkspaceId), 
    [workspaces, selectedWorkspaceId]
  )
  
  const currentProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
    [projects, selectedProjectId]
  )

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase()
    if (view === 'workspaces') {
      return workspaces.filter(w => w.name.toLowerCase().includes(query))
    } else if (view === 'projects') {
      return projects.filter(p => 
        p.workspaceId === selectedWorkspaceId && 
        p.name.toLowerCase().includes(query)
      )
    } else if (view === 'tasks') {
      return tasks.filter(t => 
        t.projectId === selectedProjectId && 
        t.title.toLowerCase().includes(query)
      )
    }
    return []
  }, [view, workspaces, projects, tasks, selectedWorkspaceId, selectedProjectId, searchQuery])

  // Handlers
  const handleWorkspaceClick = (id) => {
    dispatch(setSelectedWorkspaceId(id))
    setView('projects')
  }

  const handleProjectClick = (id) => {
    dispatch(setSelectedProjectId(id))
    setView('tasks')
  }

  const handleBack = () => {
    if (view === 'tasks') {
      setView('projects')
      dispatch(setSelectedProjectId(null))
    } else if (view === 'projects') {
      setView('workspaces')
      dispatch(setSelectedWorkspaceId(null))
    }
  }

  const openModal = (type, mode = 'create', item = null) => {
    setModalType(type)
    setModalMode(mode)
    setEditingItem(item)
    if (mode === 'edit' && item) {
      setFormData({
        name: item.name || '',
        title: item.title || '',
        description: item.description || '',
        priority: item.priority || 'medium',
        dueDate: item.dueDate || ''
      })
    } else {
      setFormData({ name: '', title: '', description: '', priority: 'medium', dueDate: '' })
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (modalMode === 'create') {
      if (view === 'workspaces') {
        dispatch(createWorkspace({ name: formData.name, description: formData.description }))
      } else if (view === 'projects') {
        dispatch(createProject({ 
          name: formData.name, 
          description: formData.description, 
          workspaceId: selectedWorkspaceId 
        }))
      } else if (view === 'tasks') {
        dispatch(createTask({ 
          title: formData.title, 
          description: formData.description, 
          projectId: selectedProjectId,
          priority: formData.priority,
          dueDate: formData.dueDate || new Date().toISOString().split('T')[0]
        }))
      }
    } else {
      // Edit logic
      if (view === 'tasks') {
        dispatch(updateTask({
          ...editingItem,
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate
        }))
      }
      // Workspaces and projects edit can be added similarly if needed
    }
    setShowModal(false)
  }

  const handleDelete = (e, id, type) => {
    e.stopPropagation()
    if (type === 'workspace') dispatch(deleteWorkspace(id))
    if (type === 'project') dispatch(deleteProject(id))
    if (type === 'task') dispatch(deleteTask(id))
  }

  const handleEdit = (e, item, type) => {
    e.stopPropagation()
    openModal(type, 'edit', item)
  }

  // Render Helpers
  const renderBreadcrumbs = () => (
    <div className="breadcrumbs">
      <span onClick={() => { setView('workspaces'); dispatch(setSelectedWorkspaceId(null)); dispatch(setSelectedProjectId(null)); }}>
        Workspaces
      </span>
      {selectedWorkspaceId && (
        <>
          <FiChevronRight className="separator" />
          <span onClick={() => { setView('projects'); dispatch(setSelectedProjectId(null)); }}>
            {currentWorkspace?.name}
          </span>
        </>
      )}
      {selectedProjectId && (
        <>
          <FiChevronRight className="separator" />
          <span className="current">{currentProject?.name}</span>
        </>
      )}
    </div>
  )

  return (
    <div className="workspace-projects">
      <header className="workspace-header">
        <div className="header-left">
          {renderBreadcrumbs()}
          <h1 className="page-title">
            {view === 'workspaces' && 'All Workspaces'}
            {view === 'projects' && `${currentWorkspace?.name} Projects`}
            {view === 'tasks' && `${currentProject?.name} Tasks`}
          </h1>
        </div>
        <div className="header-actions">
          {view !== 'workspaces' && (
            <button className="back-btn" onClick={handleBack}>
              <FiArrowLeft /> Back
            </button>
          )}
          <button className="new-btn" onClick={() => openModal(view.slice(0, -1))}>
            <FiPlus /> New {view.slice(0, -1)}
          </button>
        </div>
      </header>

      <section className="search-section">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={`Search ${view}...`}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {workspacesStatus === 'loading' || projectsStatus === 'loading' || tasksStatus === 'loading' ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <motion.div 
          className="content-grid"
          layout
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`card ${view}-card`}
              onClick={() => {
                if (view === 'workspaces') handleWorkspaceClick(item.id)
                else if (view === 'projects') handleProjectClick(item.id)
              }}
            >
              <div className="card-header">
                <div className="icon-wrapper">
                  {view === 'workspaces' && <FiBriefcase />}
                  {view === 'projects' && <FiLayers />}
                  {view === 'tasks' && <FiCheckSquare />}
                </div>
                <div className="card-actions">
                  <button onClick={(e) => handleEdit(e, item, view.slice(0, -1))}>
                    <FiEdit2 />
                  </button>
                  <button onClick={(e) => handleDelete(e, item.id, view.slice(0, -1))}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <h3>{item.name || item.title}</h3>
                <p>{item.description}</p>
                
                {view === 'tasks' && (
                  <div className="task-meta">
                    <span className={`priority ${item.priority}`}>
                      {item.priority}
                    </span>
                    <span className="due-date">
                      <FiCalendar /> {item.dueDate}
                    </span>
                  </div>
                )}
                
                {view === 'tasks' && item.subtasks?.length > 0 && (
                  <div className="subtasks-list" onClick={e => e.stopPropagation()}>
                    <h4>Subtasks ({item.subtasks.filter(s => s.completed).length}/{item.subtasks.length})</h4>
                    {item.subtasks.map(sub => (
                      <div key={sub.id} className="subtask-item">
                        <button onClick={() => dispatch(toggleSubtask({ taskId: item.id, subtaskId: sub.id }))}>
                          {sub.completed ? <FiCheckCircle className="completed" /> : <FiCircle />}
                        </button>
                        <span className={sub.completed ? 'completed' : ''}>{sub.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {view !== 'tasks' && (
                <div className="card-footer">
                  <span>
                    {view === 'workspaces' ? `${item.projectIds?.length || 0} Projects` : `${item.taskIds?.length || 0} Tasks`}
                  </span>
                  <FiChevronRight />
                </div>
              )}
            </motion.div>
          ))}
          {filteredItems.length === 0 && (
            <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FiSearch size={48} />
              <p>No {view} found. Try a different search or create one!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      )}

      {/* Modal for CRUD */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="modal-header">
                <h2>{modalMode === 'create' ? 'New' : 'Edit'} {modalType}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}><FiX /></button>
              </div>
              
              <div className="form-group">
                <label>{modalType === 'task' ? 'Title' : 'Name'}</label>
                <input 
                  type="text" 
                  value={modalType === 'task' ? formData.title : formData.name}
                  onChange={(e) => setFormData({ ...formData, [modalType === 'task' ? 'title' : 'name']: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              {modalType === 'task' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input 
                      type="date" 
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="confirm-btn" onClick={handleSave}>
                  {modalMode === 'create' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkspaceProjects
