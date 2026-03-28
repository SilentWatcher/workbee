import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  FiTag,
  FiFileText
} from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'
import { triggerTaskCompletionConfetti, triggerMilestoneConfetti } from '../../utils/confetti'
import StickyView from './StickyView'
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

  // Helper to format date as "Oct 18"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const todayStr = formatDate(new Date());

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update Design System documentation',
      description: 'Comprehensive update to the design system documentation including new components, usage guidelines, and accessibility standards.',
      project: 'Precision Design System',
      status: 'in-progress',
      priority: 'high',
      dueDate: todayStr,
      createdDate: todayStr,
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
      title: 'Review Q4 Product Roadmap',
      description: 'Schedule and conduct stakeholder meetings to review and approve the Q4 product roadmap.',
      project: 'Product Launch',
      status: 'pending',
      priority: 'medium',
      dueDate: todayStr,
      createdDate: todayStr,
      assignee: {
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr2ghT3lYftweZ1nXjYe-2wDmyuXpK9mexT6ZrswC41k6yossNmdGP6uDKxsJQPuW-XDbA70yKHryjFRrIpeC5f3sLItPYCyBTtO8H_bl9sqXyySj1AqBxW9c7NkZlhuTD9oqrOlT8p8kvq5j8pfnTWD-Fbmk_DtgEgQfw5enr7hHBImw0ge9tTDhKCfDUaCsRJsniNc4WT1nIts63tgJ42CimkkPRmYTSDgct_JJidd-cDPAxxTsoXR4Gp41fVixIDSyodXcuw'
      },
      progress: 25,
      tags: ['planning', 'stakeholders'],
      comments: 1,
      attachments: 5,
      subtasks: []
    },
    {
      id: 3,
      title: 'Draft final audit report',
      description: 'Complete the comprehensive audit report for the finance team.',
      project: 'Internal Audit',
      status: 'completed',
      priority: 'low',
      dueDate: todayStr,
      createdDate: todayStr,
      assignee: {
        name: 'Marcus Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcxQWgyR8hkLJuegUGBRfUhZz6sdGzu_IMbCbat-DgiYm0ih3AKbS4DDvXuAGRCeLdolvv-fXIA2YW2Z2f_tPtYN1s5qzzEkX3AUUKnEOt_3pjc9h-wOmFdwFNi6j_Q3KTmg8RqNs6Ma3stovjBzBamN7vfyKTZ7-Yk8fh_AUnVIID10_kCpMaD0JQn8QPh--FIxYGGG2ZGnVU0jgHYBu3hA--ETGaxjaq6SqPy8DRBr9ufq7icz3oEkpCqm9dcIPWIpAsRV54g'
      },
      progress: 100,
      tags: ['audit', 'finance'],
      comments: 8,
      attachments: 12,
      subtasks: []
    },
    {
      id: 4,
      title: 'Implement API rate limiting',
      description: 'Add rate limiting functionality to prevent API abuse.',
      project: 'API Infrastructure',
      status: 'in-progress',
      priority: 'high',
      dueDate: todayStr,
      createdDate: todayStr,
      assignee: {
        name: 'Jordan Smith',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3yozngkh8-L3vmfDBgpRlAngQFtk587Hv-DCpC6yrzUxMpU0xSsedFYPTpw-MpfijTS42wwGy2b2LNwf05vl42n0Ivr1ISVATaktzfUbGDf44ug-OK2JeNgOd4q_WZqTCma4WP8h7Z43UqguSXhueaGR3v9pciiWi5mzzX1vrUlIxcbwwaJ7XeZy2IVJB_GrgyV0bugC5mYLM-omQ7OMOXK0oll2up-4Y_7JtVzahPmjAac51rzQ2r5dhS0Go3S5-Dk9tsvo3w'
      },
      progress: 40,
      tags: ['api', 'backend'],
      comments: 2,
      attachments: 1,
      subtasks: []
    },
    {
      id: 5,
      title: 'User testing for mobile app',
      description: 'Conduct comprehensive user testing sessions.',
      project: 'Mobile Development',
      status: 'pending',
      priority: 'medium',
      dueDate: todayStr,
      createdDate: todayStr,
      assignee: {
        name: 'Emma Wilson',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q'
      },
      progress: 10,
      tags: ['testing', 'mobile'],
      comments: 0,
      attachments: 0,
      subtasks: []
    },
    {
      id: 6,
      title: 'Database optimization',
      description: 'Optimize slow queries and add missing indexes.',
      project: 'Backend Infrastructure',
      status: 'pending',
      priority: 'high',
      dueDate: todayStr,
      assignee: { name: 'Jordan Smith', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3yozngkh8-L3vmfDBgpRlAngQFtk587Hv-DCpC6yrzUxMpU0xSsedFYPTpw-MpfijTS42wwGy2b2LNwf05vl42n0Ivr1ISVATaktzfUbGDf44ug-OK2JeNgOd4q_WZqTCma4WP8h7Z43UqguSXhueaGR3v9pciiWi5mzzX1vrUlIxcbwwaJ7XeZy2IVJB_GrgyV0bugC5mYLM-omQ7OMOXK0oll2up-4Y_7JtVzahPmjAac51rzQ2r5dhS0Go3S5-Dk9tsvo3w' },
      progress: 0,
      tags: ['database', 'performance']
    },
    {
      id: 7,
      title: 'Landing page redesign',
      description: 'New hero section and updated value propositions.',
      project: 'Marketing Website',
      status: 'in-progress',
      priority: 'medium',
      dueDate: todayStr,
      assignee: { name: 'Alex Rivera', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_8wrdkSD7rqkRlMSM6-qbhl2Y7EaEV30ZAs-unmrc5-9gWr8p3Mkn64qp8Htx6nxVIQ4Jbsoptdf5QKD90nmUUBg1PC0N3DtKKLKHsrA-Lb9rQwTgAoKwBebiPyc1Layoiox4H2GS2bJhcqpzXpjv3L7oKBiN8TXabOK8vLpUpRGyyDIMsPi5yL3DPqgLIbPXNHDQbInSnyEO7EU0oYM9xN2zggmM0w4dTzM_PeIb5UvTdKAxUxjn3YBA0Rs3NS5NPYlwShhVQ' },
      progress: 50,
      tags: ['marketing', 'design']
    },
    {
      id: 8,
      title: 'Security patch deployment',
      description: 'Deploy critical security fixes to all environments.',
      project: 'DevOps',
      status: 'completed',
      priority: 'high',
      dueDate: todayStr,
      assignee: { name: 'Marcus Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcxQWgyR8hkLJuegUGBRfUhZz6sdGzu_IMbCbat-DgiYm0ih3AKbS4DDvXuAGRCeLdolvv-fXIA2YW2Z2f_tPtYN1s5qzzEkX3AUUKnEOt_3pjc9h-wOmFdwFNi6j_Q3KTmg8RqNs6Ma3stovjBzBamN7vfyKTZ7-Yk8fh_AUnVIID10_kCpMaD0JQn8QPh--FIxYGGG2ZGnVU0jgHYBu3hA--ETGaxjaq6SqPy8DRBr9ufq7icz3oEkpCqm9dcIPWIpAsRV54g' },
      progress: 100,
      tags: ['security', 'devops']
    },
    {
      id: 9,
      title: 'New feature brainstorming',
      description: 'Team workshop to define the roadmap for next quarter.',
      project: 'Product Strategy',
      status: 'pending',
      priority: 'low',
      dueDate: todayStr,
      assignee: { name: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr2ghT3lYftweZ1nXjYe-2wDmyuXpK9mexT6ZrswC41k6yossNmdGP6uDKxsJQPuW-XDbA70yKHryjFRrIpeC5f3sLItPYCyBTtO8H_bl9sqXyySj1AqBxW9c7NkZlhuTD9oqrOlT8p8kvq5j8pfnTWD-Fbmk_DtgEgQfw5enr7hHBImw0ge9tTDhKCfDUaCsRJsniNc4WT1nIts63tgJ42CimkkPRmYTSDgct_JJidd-cDPAxxTsoXR4Gp41fVixIDSyodXcuw' },
      progress: 0,
      tags: ['strategy', 'planning']
    },
    {
      id: 10,
      title: 'Customer support sync',
      description: 'Weekly meeting to discuss top customer issues.',
      project: 'Customer Success',
      status: 'in-progress',
      priority: 'medium',
      dueDate: todayStr,
      assignee: { name: 'Emma Wilson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q' },
      progress: 30,
      tags: ['support', 'sync']
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    project: '',
    assignee: ''
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const assigneeObj = teamMembers.find(m => m.id === newTask.assignee) || teamMembers[1];
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      status: 'pending',
      progress: 0,
      assignee: {
        name: assigneeObj.name,
        avatar: assigneeObj.avatar
      },
      dueDate: formatDate(new Date(newTask.dueDate))
    };
    setTasks([taskToAdd, ...tasks]);
    setShowTaskForm(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      project: '',
      assignee: ''
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

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
    // Trigger confetti
    triggerTaskCompletionConfetti()
    console.log(`Task ${taskId} completed!`)
  }

  const handleMilestoneComplete = () => {
    // Trigger milestone confetti
    triggerMilestoneConfetti()
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0)
    // Handle "Oct 18" format by adding current year
    const currentYear = new Date().getFullYear()
    return new Date(`${dateStr}, ${currentYear}`)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesAssignee = filters.assignee === 'all' || 
                           task.assignee.name.toLowerCase().includes(filters.assignee.toLowerCase());
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesAssignee && matchesPriority;
  })

  const renderListView = () => (
    <motion.div 
      className="tasks-list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredTasks.map((task) => (
        <motion.div 
          key={task.id} 
          className="task-row"
          variants={item}
          whileHover={{ x: 5, background: 'var(--surface-container-low)' }}
          onClick={() => handleTaskClick(task)}
        >
          <div className="task-main">
            <button 
              className="complete-btn"
              onClick={(e) => {
                e.stopPropagation()
                handleTaskComplete(task.id)
              }}
            >
              <FiCheckCircle size={20} />
            </button>
            <div className="task-info">
              <h4>{task.title}</h4>
              <p>{task.project}</p>
            </div>
          </div>
          
          <div className="task-meta">
            <div className={`priority-tag ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </div>
            <div className="due-date">
              <FiCalendar size={14} />
              {task.dueDate}
            </div>
            <div className="assignee">
              <img src={task.assignee.avatar} alt={task.assignee.name} title={task.assignee.name} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderTimelineView = () => {
    const sortedTasks = [...filteredTasks].sort((a, b) => parseDate(a.dueDate) - parseDate(b.dueDate))
    
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
      { id: 'pending', title: 'To Do', tasks: filteredTasks.filter(t => t.status === 'pending') },
      { id: 'in-progress', title: 'In Progress', tasks: filteredTasks.filter(t => t.status === 'in-progress') },
      { id: 'completed', title: 'Done', tasks: filteredTasks.filter(t => t.status === 'completed') }
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
    return (
      <AnimatePresence>
        {showTaskDetail && selectedTask && (
          <div className="task-detail-container">
            <motion.div 
              className="task-detail-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTaskDetail(false)}
            />
            <motion.div 
              className="task-detail-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <div className="header-top">
                  <div className="task-badges">
                    <span className={`status-badge ${getStatusClass(selectedTask.status)}`}>
                      {selectedTask.status.replace('-', ' ')}
                    </span>
                    <span className={`priority-badge ${getPriorityClass(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div className="header-actions">
                    <button className="action-btn edit-btn" onClick={() => setEditingTask(!editingTask)}>
                      <FiEdit size={18} />
                    </button>
                    <button className="action-btn delete-btn">
                      <FiTrash2 size={18} />
                    </button>
                    <button className="action-btn close-btn" onClick={() => setShowTaskDetail(false)}>
                      <FiX size={24} />
                    </button>
                  </div>
                </div>
                
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
              </div>

              <div className="drawer-body">
                <div className="detail-section">
                  <label>Description</label>
                  {editingTask ? (
                    <textarea 
                      value={selectedTask.description}
                      onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                      className="task-description-input"
                      rows={4}
                    />
                  ) : (
                    <p className="description-text">{selectedTask.description}</p>
                  )}
                </div>

                <div className="detail-grid">
                  <div className="grid-item">
                    <FiLayout size={16} />
                    <div className="item-content">
                      <label>Project</label>
                      <span>{selectedTask.project}</span>
                    </div>
                  </div>
                  <div className="grid-item">
                    <FiUser size={16} />
                    <div className="item-content">
                      <label>Assignee</label>
                      <div className="assignee-pill">
                        <img src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                        <span>{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item">
                    <FiCalendar size={16} />
                    <div className="item-content">
                      <label>Due Date</label>
                      <span>{selectedTask.dueDate}</span>
                    </div>
                  </div>
                  <div className="grid-item">
                    <FiClock size={16} />
                    <div className="item-content">
                      <label>Progress</label>
                      <div className="progress-mini">
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${selectedTask.progress}%` }}></div>
                        </div>
                        <span>{selectedTask.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <label>Subtasks</label>
                  <div className="subtasks-list">
                    {selectedTask.subtasks.map((subtask) => (
                      <div key={subtask.id} className="subtask-item">
                        <input 
                          type="checkbox" 
                          checked={subtask.completed}
                          onChange={(e) => {
                            if (e.target.checked) triggerTaskCompletionConfetti()
                          }}
                        />
                        <span className={subtask.completed ? 'completed' : ''}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <label>Attachments</label>
                  <div className="attachments-grid">
                    <div className="attachment-card">
                      <FiPaperclip size={16} />
                      <span>design-specs.pdf</span>
                    </div>
                    <div className="attachment-card">
                      <FiPaperclip size={16} />
                      <span>wireframes.fig</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                {editingTask ? (
                  <button className="save-btn" onClick={() => setEditingTask(false)}>
                    <FiSave size={18} />
                    Save Changes
                  </button>
                ) : (
                  <button className="complete-task-btn" onClick={() => handleTaskComplete(selectedTask.id)}>
                    <FiCheckCircle size={18} />
                    Mark as Complete
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
            <button 
              className={`view-btn ${viewMode === 'sticky' ? 'active' : ''}`}
              onClick={() => setViewMode('sticky')}
            >
              <FiFileText size={18} />
              Sticky View
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
        {viewMode === 'sticky' && (
          <StickyView 
            tasks={tasks} 
            onAddTask={() => setShowTaskForm(true)}
            onDeleteTask={(id) => setTasks(prev => prev.filter(t => t.id !== id))}
            onUpdateTask={(updatedTask) => setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))}
          />
        )}
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
            
            <form className="task-form" onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input 
                  type="text" 
                  placeholder="Enter task title..." 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter task description..." 
                  rows={4}
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
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
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Project</label>
                <select
                  value={newTask.project}
                  onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                  required
                >
                  <option value="">Select Project</option>
                  <option value="Precision Design System">Precision Design System</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Internal Audit">Internal Audit</option>
                  <option value="API Infrastructure">API Infrastructure</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Backend Infrastructure">Backend Infrastructure</option>
                  <option value="Marketing Website">Marketing Website</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Product Strategy">Product Strategy</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Assignee</label>
                <select
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  required
                >
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
