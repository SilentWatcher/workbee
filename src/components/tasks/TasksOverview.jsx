import React, { useState } from 'react'
import { 
  FiFilter,
  FiPlus,
  FiMoreVertical,
  FiSearch,
  FiList,
  FiCalendar,
  FiLayout,
  FiUser,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiArrowRight,
  FiX,
  FiSave,
  FiMessageSquare,
  FiPaperclip,
  FiTag
} from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'
import { triggerTaskCompletionConfetti, triggerMilestoneConfetti } from '../../utils/confetti'
import './TasksOverview.scss'

const TasksOverview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('list') // list, timeline, kanban
  const [filters, setFilters] = useState({
    status: 'all',
    assignee: 'all',
    priority: 'all'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editingTask, setEditingTask] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  const tasksData = [
    {
      id: 1,
      title: 'Update Design System documentation',
      description: 'Comprehensive update to the design system documentation including new components, usage guidelines, and accessibility standards.',
      project: 'Precision Design System',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Oct 18',
      createdDate: 'Oct 10',
      assignee: {
        name: 'Alex Rivera',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_8wrdkSD7rqkRlMSM6-qbhl2Y7EaEV30ZAs-unmrc5-9gWr8p3Mkn64qp8Htx6nxVIQ4Jbsoptdf5QKD90nmUUBg1PC0N3DtKKLKHsrA-Lb9rQwTgAoKwBebiPyc1Layoiox4H2GS2bJhcqpzXpjv3L7oKBiN8TXabOK8vLpUpRGyyDIMsPi5yL3DPqgLIbPXNHDQbInSnyEO7EU0oYM9xN2zggmM0w4dTzM_PeIb5UvTdKAxUxjn3YBA0Rs3NS5NPYlwShhVQ'
      },
      progress: 65,
      tags: ['design', 'documentation', 'urgent'],
      comments: 3,
      attachments: 2,
      subtasks: [
        { id: 1, title: 'Review existing documentation', completed: true },
        { id: 2, title: 'Add new component examples', completed: false },
        { id: 3, title: 'Update accessibility guidelines', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Review Q4 Product Roadmap with Stakeholders',
      description: 'Schedule and conduct stakeholder meetings to review and approve the Q4 product roadmap.',
      project: 'Product Launch',
      status: 'pending',
      priority: 'medium',
      dueDate: 'Oct 24',
      createdDate: 'Oct 12',
      assignee: {
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr2ghT3lYftweZ1nXjYe-2wDmyuXpK9mexT6ZrswC41k6yossNmdGP6uDKxsJQPuW-XDbA70yKHryjFRrIpeC5f3sLItPYCyBTtO8H_bl9sqXyySj1AqBxW9c7NkZlhuTD9oqrOlT8p8kvq5j8pfnTWD-Fbmk_DtgEgQfw5enr7hHBImw0ge9tTDhKCfDUaCsRJsniNc4WT1nIts63tgJ42CimkkPRmYTSDgct_JJidd-cDPAxxTsoXR4Gp41fVixIDSyodXcuw'
      },
      progress: 25,
      tags: ['planning', 'stakeholders'],
      comments: 1,
      attachments: 5,
      subtasks: [
        { id: 1, title: 'Prepare presentation materials', completed: true },
        { id: 2, title: 'Schedule stakeholder meetings', completed: false },
        { id: 3, title: 'Gather feedback and incorporate changes', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Draft final audit report for finance team',
      description: 'Complete the comprehensive audit report for the finance team including all findings and recommendations.',
      project: 'Internal Audit',
      status: 'completed',
      priority: 'low',
      dueDate: 'Oct 15',
      createdDate: 'Oct 1',
      assignee: {
        name: 'Marcus Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcxQWgyR8hkLJuegUGBRfUhZz6sdGzu_IMbCbat-DgiYm0ih3AKbS4DDvXuAGRCeLdolvv-fXIA2YW2Z2f_tPtYN1s5qzzEkX3AUUKnEOt_3pjc9h-wOmFdwFNi6j_Q3KTmg8RqNs6Ma3stovjBzBamN7vfyKTZ7-Yk8fh_AUnVIID10_kCpMaD0JQn8QPh--FIxYGGG2ZGnVU0jgHYBu3hA--ETGaxjaq6SqPy8DRBr9ufq7icz3oEkpCqm9dcIPWIpAsRV54g'
      },
      progress: 100,
      tags: ['audit', 'finance', 'completed'],
      comments: 8,
      attachments: 12,
      subtasks: [
        { id: 1, title: 'Gather financial data', completed: true },
        { id: 2, title: 'Conduct audit analysis', completed: true },
        { id: 3, title: 'Write final report', completed: true }
      ]
    },
    {
      id: 4,
      title: 'Implement API rate limiting',
      description: 'Add rate limiting functionality to prevent API abuse and ensure fair usage.',
      project: 'API Infrastructure',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Oct 20',
      createdDate: 'Oct 14',
      assignee: {
        name: 'Jordan Smith',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3yozngkh8-L3vmfDBgpRlAngQFtk587Hv-DCpC6yrzUxMpU0xSsedFYPTpw-MpfijTS42wwGy2b2LNwf05vl42n0Ivr1ISVATaktzfUbGDf44ug-OK2JeNgOd4q_WZqTCma4WP8h7Z43UqguSXhueaGR3v9pciiWi5mzzX1vrUlIxcbwwaJ7XeZy2IVJB_GrgyV0bugC5mYLM-omQ7OMOXK0oll2up-4Y_7JtVzahPmjAac51rzQ2r5dhS0Go3S5-Dk9tsvo3w'
      },
      progress: 40,
      tags: ['api', 'backend', 'security'],
      comments: 2,
      attachments: 1,
      subtasks: [
        { id: 1, title: 'Research rate limiting strategies', completed: true },
        { id: 2, title: 'Implement middleware', completed: false },
        { id: 3, title: 'Add monitoring and alerts', completed: false }
      ]
    },
    {
      id: 5,
      title: 'User testing for mobile app',
      description: 'Conduct comprehensive user testing sessions for the mobile application and gather feedback.',
      project: 'Mobile Development',
      status: 'pending',
      priority: 'medium',
      dueDate: 'Oct 25',
      createdDate: 'Oct 13',
      assignee: {
        name: 'Emma Wilson',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q'
      },
      progress: 10,
      tags: ['testing', 'mobile', 'ux'],
      comments: 0,
      attachments: 0,
      subtasks: [
        { id: 1, title: 'Recruit test participants', completed: false },
        { id: 2, title: 'Prepare test scenarios', completed: false },
        { id: 3, title: 'Conduct testing sessions', completed: false }
      ]
    }
  ]

  const teamMembers = [
    { id: 'all', name: 'All Assignees', avatar: null },
    { id: 'alex', name: 'Alex Rivera', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_8wrdkSD7rqkRlMSM6-qbhl2Y7EaEV30ZAs-unmrc5-9gWr8p3Mkn64qp8Htx6nxVIQ4Jbsoptdf5QKD90nmUUBg1PC0N3DtKKLKHsrA-Lb9rQwTgAoKwBebiPyc1Layoiox4H2GS2bJhcqpzXpjv3L7oKBiN8TXabOK8vLpUpRGyyDIMsPi5yL3DPqgLIbPXNHDQbInSnyEO7EU0oYM9xN2zggmM0w4dTzM_PeIb5UvTdKAxUxjn3YBA0Rs3NS5NPYlwShhVQ' },
    { id: 'sarah', name: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr2ghT3lYftweZ1nXjYe-2wDmyuXpK9mexT6ZrswC41k6yossNmdGP6uDKxsJQPuW-XDbA70yKHryjFRrIpeC5f3sLItPYCyBTtO8H_bl9sqXyySj1AqBxW9c7NkZlhuTD9oqrOlT8p8kvq5j8pfnTWD-Fbmk_DtgEgQfw5enr7hHBImw0ge9tTDhKCfDUaCsRJsniNc4WT1nIts63tgJ42CimkkPRmYTSDgct_JJidd-cDPAxxTsoXR4Gp41fVixIDSyodXcuw' },
    { id: 'marcus', name: 'Marcus Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcxQWgyR8hkLJuegUGBRfUhZz6sdGzu_IMbCbat-DgiYm0ih3AKbS4DDvXuAGRCeLdolvv-fXIA2YW2Z2f_tPtYN1s5qzzEkX3AUUKnEOt_3pjc9h-wOmFdwFNi6j_Q3KTmg8RqNs6Ma3stovjBzBamN7vfyKTZ7-Yk8fh_AUnVIID10_kCpMaD0JQn8QPh--FIxYGGG2ZGnVU0jgHYBu3hA--ETGaxjaq6SqPy8DRBr9ufq7icz3oEkpCqm9dcIPWIpAsRV54g' },
    { id: 'jordan', name: 'Jordan Smith', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3yozngkh8-L3vmfDBgpRlAngQFtk587Hv-DCpC6yrzUxMpU0xSsedFYPTpw-MpfijTS42wwGy2b2LNwf05vl42n0Ivr1ISVATaktzfUbGDf44ug-OK2JeNgOd4q_WZqTCma4WP8h7Z43UqguSXhueaGR3v9pciiWi5mzzX1vrUlIxcbwwaJ7XeZy2IVJB_GrgyV0bugC5mYLM-omQ7OMOXK0oll2up-4Y_7JtVzahPmjAac51rzQ2r5dhS0Go3S5-Dk9tsvo3w' },
    { id: 'emma', name: 'Emma Wilson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q' }
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'in-progress':
        return 'status-in-progress'
      case 'pending':
        return 'status-pending'
      default:
        return 'status-pending'
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high'
      case 'medium':
        return 'priority-medium'
      case 'low':
        return 'priority-low'
      default:
        return 'priority-medium'
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskDetail(true)
  }

  const handleTaskComplete = (taskId) => {
    // Trigger confetti for task completion
    triggerTaskCompletionConfetti()
    
    // You could update the task status here
    console.log(`Task ${taskId} completed!`)
  }

  const handleMilestoneComplete = () => {
    // Trigger milestone confetti
    triggerMilestoneConfetti()
  }

  const renderListView = () => (
    <div className="tasks-list-view">
      <div className="tasks-list">
        {tasksData.map((task) => (
          <div 
            key={task.id} 
            className="task-item"
            onClick={() => handleTaskClick(task)}
          >
            <div className="task-left">
              <div className="task-checkbox">
                <input 
                  type="checkbox" 
                  checked={task.status === 'completed'}
                  onChange={(e) => {
                    e.stopPropagation()
                    if (e.target.checked) {
                      handleTaskComplete(task.id)
                    }
                  }}
                />
              </div>
              <div className="task-content">
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span className="project-name">{task.project}</span>
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    <FiClock size={12} />
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="task-right">
              <div className="task-stats">
                {task.comments > 0 && (
                  <span className="stat-item">
                    <FiMessageSquare size={14} />
                    {task.comments}
                  </span>
                )}
                {task.attachments > 0 && (
                  <span className="stat-item">
                    <FiPaperclip size={14} />
                    {task.attachments}
                  </span>
                )}
              </div>
              <div className="assignee-avatar">
                <img src={task.assignee.avatar} alt={task.assignee.name} />
              </div>
              <button className="task-menu">
                <FiMoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTimelineView = () => {
    const sortedTasks = [...tasksData].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    
    return (
      <div className="tasks-timeline-view">
        <div className="timeline">
          {sortedTasks.map((task, index) => (
            <div key={task.id} className="timeline-item">
              <div className="timeline-marker">
                <div className={`timeline-dot ${getPriorityClass(task.priority)}`}></div>
                {index < sortedTasks.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4 className="timeline-title">{task.title}</h4>
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="timeline-description">{task.description}</p>
                <div className="timeline-footer">
                  <div className="timeline-meta">
                    <span className="project-name">{task.project}</span>
                    <span className="due-date">
                      <FiCalendar size={12} />
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="assignee-avatar">
                    <img src={task.assignee.avatar} alt={task.assignee.name} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderKanbanView = () => {
    const columns = [
      { id: 'pending', title: 'To Do', tasks: tasksData.filter(t => t.status === 'pending') },
      { id: 'in-progress', title: 'In Progress', tasks: tasksData.filter(t => t.status === 'in-progress') },
      { id: 'completed', title: 'Done', tasks: tasksData.filter(t => t.status === 'completed') }
    ]

    return (
      <div className="tasks-kanban-view">
        <div className="kanban-columns">
          {columns.map((column) => (
            <div key={column.id} className="kanban-column">
              <div className="column-header">
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <div className="column-tasks">
                {column.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="kanban-task"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="task-header">
                      <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                    <div className="task-footer">
                      <div className="task-meta">
                        <span className="project-name">{task.project}</span>
                        <span className="due-date">
                          <FiClock size={12} />
                          {task.dueDate}
                        </span>
                      </div>
                      <div className="assignee-avatar">
                        <img src={task.assignee.avatar} alt={task.assignee.name} />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  className="add-task-btn"
                  onClick={() => setShowTaskForm(true)}
                >
                  <FiPlus size={16} />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTaskDetail = () => {
    if (!selectedTask) return null

    return (
      <div className="task-detail-modal">
        <div className="modal-overlay" onClick={() => setShowTaskDetail(false)}></div>
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-left">
              <h2 className="task-title">
                {editingTask ? (
                  <input 
                    type="text" 
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})}
                    className="task-title-input"
                  />
                ) : (
                  selectedTask.title
                )}
              </h2>
              <div className="task-badges">
                <span className={`status-badge ${getStatusClass(selectedTask.status)}`}>
                  {selectedTask.status.replace('-', ' ')}
                </span>
                <span className={`priority-badge ${getPriorityClass(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
            </div>
            <div className="header-actions">
              {editingTask ? (
                <>
                  <button 
                    className="save-btn"
                    onClick={() => setEditingTask(false)}
                  >
                    <FiSave size={16} />
                    Save
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => setEditingTask(false)}
                  >
                    <FiX size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="edit-btn"
                    onClick={() => setEditingTask(true)}
                  >
                    <FiEdit size={16} />
                  </button>
                  <button className="delete-btn">
                    <FiTrash2 size={16} />
                  </button>
                  <button 
                    className="close-btn"
                    onClick={() => setShowTaskDetail(false)}
                  >
                    <FiX size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="modal-body">
            <div className="task-main-content">
              <div className="task-description-section">
                <h3>Description</h3>
                {editingTask ? (
                  <textarea 
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                    className="task-description-input"
                    rows={6}
                  />
                ) : (
                  <p>{selectedTask.description}</p>
                )}
              </div>

              <div className="task-details-grid">
                <div className="detail-item">
                  <label>Project</label>
                  <span>{selectedTask.project}</span>
                </div>
                <div className="detail-item">
                  <label>Assignee</label>
                  <div className="assignee-info">
                    <img src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                    <span>{selectedTask.assignee.name}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <label>Due Date</label>
                  <span>{selectedTask.dueDate}</span>
                </div>
                <div className="detail-item">
                  <label>Created</label>
                  <span>{selectedTask.createdDate}</span>
                </div>
                <div className="detail-item">
                  <label>Progress</label>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${selectedTask.progress}%` }}
                    ></div>
                    <span>{selectedTask.progress}%</span>
                  </div>
                </div>
                <div className="detail-item">
                  <label>Tags</label>
                  <div className="tags">
                    {selectedTask.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        <FiTag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="subtasks-section">
                <h3>Subtasks</h3>
                <div className="subtasks-list">
                  {selectedTask.subtasks.map((subtask) => (
                    <div key={subtask.id} className="subtask-item">
                      <input 
                        type="checkbox" 
                        checked={subtask.completed}
                        onChange={(e) => {
                          if (e.target.checked) {
                            triggerTaskCompletionConfetti()
                          }
                        }}
                      />
                      <span className={subtask.completed ? 'completed' : ''}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
                {selectedTask.progress === 100 && (
                  <button 
                    className="milestone-btn"
                    onClick={handleMilestoneComplete}
                  >
                    <FiCheckCircle size={16} />
                    Mark as Milestone
                  </button>
                )}
              </div>
            </div>

            <div className="task-sidebar">
              <div className="activity-section">
                <h3>Activity</h3>
                <div className="activity-feed">
                  <div className="activity-item">
                    <div className="activity-avatar">
                      <img src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                    </div>
                    <div className="activity-content">
                      <p><strong>{selectedTask.assignee.name}</strong> created this task</p>
                      <span className="activity-time">2 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-avatar">
                      <img src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                    </div>
                    <div className="activity-content">
                      <p><strong>{selectedTask.assignee.name}</strong> updated progress to {selectedTask.progress}%</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="attachments-section">
                <h3>Attachments ({selectedTask.attachments})</h3>
                <div className="attachments-list">
                  <div className="attachment-item">
                    <FiPaperclip size={16} />
                    <span>design-specs.pdf</span>
                  </div>
                  <div className="attachment-item">
                    <FiPaperclip size={16} />
                    <span>wireframes.fig</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tasks-overview">
      {/* Header */}
      <div className="tasks-header">
        <div className="header-left">
          <h1>Tasks</h1>
          <div className="view-switcher">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList size={18} />
              List View
            </button>
            <button 
              className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <FiCalendar size={18} />
              Timeline View
            </button>
            <button 
              className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              <FiLayout size={18} />
              Kanban View
            </button>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="add-task-btn"
            onClick={() => setShowTaskForm(true)}
          >
            <FiPlus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="tasks-filters">
        <div className="search-box">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            value={filters.assignee}
            onChange={(e) => setFilters({...filters, assignee: e.target.value})}
            className="filter-select"
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          <select 
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="filter-select"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="tasks-content">
        {viewMode === 'list' && renderListView()}
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'kanban' && renderKanbanView()}
      </div>

      {/* Task Detail Modal */}
      {showTaskDetail && renderTaskDetail()}

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="task-form-modal">
          <div className="task-form-overlay" onClick={() => setShowTaskForm(false)}></div>
          <div className="task-form-content">
            <div className="task-form-header">
              <h3>Create New Task</h3>
              <button 
                className="close-btn"
                onClick={() => setShowTaskForm(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form className="task-form">
              <div className="form-group">
                <label>Task Title</label>
                <input type="text" placeholder="Enter task title..." />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter task description..." rows={4}></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Project</label>
                <select>
                  <option value="">Select Project</option>
                  <option value="precision-design">Precision Design System</option>
                  <option value="product-launch">Product Launch</option>
                  <option value="internal-audit">Internal Audit</option>
                  <option value="api-infrastructure">API Infrastructure</option>
                  <option value="mobile-development">Mobile Development</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Assignee</label>
                <select>
                  <option value="">Unassigned</option>
                  {teamMembers.filter(m => m.id !== 'all').map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn--secondary"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  <FiPlus size={16} />
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TasksOverview
