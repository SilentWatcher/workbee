import React, { useState } from 'react'
import { 
  FiFilter,
  FiShare,
  FiMoreHorizontal,
  FiPlus,
  FiMove,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiLayout,
  FiList,
  FiCalendar as FiTimeline,
  FiX,
  FiCheck,
  FiUser,
  FiSearch
} from 'react-icons/fi'
import './ProjectKanbanBoard.scss'

const ProjectKanbanBoard = () => {
  const [viewMode, setViewMode] = useState('kanban') // kanban, timeline, list
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    assignee: 'all'
  })
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      taskCount: 4,
      tasks: [
        {
          id: 1,
          title: 'Implement secure authentication for mobile endpoints',
          priority: 'high',
          dueDate: 'Oct 18',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCHbzk_bDm5OTrVrq5QF9ABHQFf64rYoA08Y2-JvEQXYKGqBCjEmMWIAxTEBBKP16al57QmlzQ6MS9eFZVALpBysOiEJE1tM776343bipbwzWe7GPctj3u6czGr15S6AHqUuyVnv3bm7U-H-R_OMju9iUhfB5Xt33wI1Fs7Sbd57ydL5JJpQsEmkmoiFEFQBYS3z8MRn8Qs4CetL2E-TZ_Akhq7tsPtL-07BmvcoHnCW72nfXTHWDawG1lmTk8tWOtNV1xK7iqHw',
          status: 'todo',
          description: 'Implement OAuth 2.0 and JWT authentication for mobile applications'
        },
        {
          id: 2,
          title: 'Design system audit for accessibility compliance',
          priority: 'medium',
          dueDate: 'Oct 20',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeAEN_TQFKOqDl13wnSfVwUvDUNkA1_YjbLZj2ym80-lN0t2Ks5DGqAez8ZrdW12qhurkzbfEq7sIAedV9GnKKrn5dXLCIdebLtv4VCXn08m9SWR96kZnqlE8mhsT0nyM8L0ab1jM9vt_okijAZWQszq5TuT-HBjr3ICFVbhhebi52UWz1V9JzmHzUxPNtMbHFJ6swIG3jEkQlezZTusp14M7Z_FAjN4lGp3Gag0Un6ppaw2vvhDoWx_PIRzWwH5g0zBMxgepC9g',
          status: 'todo',
          description: 'Conduct comprehensive WCAG 2.1 compliance audit'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      taskCount: 2,
      tasks: [
        {
          id: 3,
          title: 'API Infrastructure refactoring for high-volume transactions',
          priority: 'high',
          status: 'In Dev',
          statusIcon: FiClock,
          statusColor: 'primary',
          assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBLGDSF8K37Km-063t_LNWEILNgd5Hy15vQEKV_5Kjp95or9uNLN0XBgbM5fW53F8K5s06-ZGJaSzxafWX2DpzoKFXqRU5CD2zu4pgXEK9sjkV7f1t2eqwd7YHCDWC2oBIEF2J29nVGdEjlxBUJB7ohKziXvlPMs9PCLsrAmFKLKBoLTNxt7BpVNk7OPffogFv42PD4x8hwrAs_rZchvNKnrYZn51jYJmXmR2eVARquItkp8JnIFFe2zbW23yO44Dg2IdpcgJ0CDQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAjnQrt9HvQlh6XCoGkTvUeF8cziv2VA1aChweuA-1I8GDuBA1WobSmK4Z_yKa2vEi5hwNeoxoRu1awVReOHCr4FiWkBwm1q74t8hn_kLG0UUQCNLTrfjlu7c-qxl6LgD0Pews4i1AOIWPZz0M8j-RrWL-mIyAgV-3RBy0A_3g43Cial3aka32BoMlNi32l8YW4BiedEHVIz94oHbMN2C8f40BXdZ1JinRbLkQpRHWP4iJ13m66J96LbDM6d-IKJhp_1UBFZB-7Dg'
          ],
          hasTrendingIcon: true,
          description: 'Scale API infrastructure to handle 10x current load'
        }
      ]
    },
    {
      id: 'testing',
      title: 'Testing',
      taskCount: 1,
      tasks: [
        {
          id: 4,
          title: 'Dark mode color palette refinement for data viz',
          priority: 'low',
          status: 'QA Review',
          statusIcon: FiAlertCircle,
          statusColor: 'tertiary',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8swrihisi5lo-PUSDf6kvc_N4yp_R_rwAKIlKi7qm8Xv9tLmRVCkdAuo6Uey0SKRHNU8CvBzHHQPZKBcpsK0wZTHivWvSTZJaMCy0BnDVGsEHyDnEITKU6_nw1uk5Ne7AMP8_YRcImXGLRpVTUNGaheydNvZej6j9MX4E83VE06LZ9nARNYf8xa9ijR6c_FELno9mwt0Fc_0Mwx5WMa9pDU1b_o_F8DDveI0yo5GPtGfWjKTD7n1A1D2OYTjM1Rch2x_dhbpjiw',
          description: 'Refine dark mode colors for better data visualization contrast'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      taskCount: 12,
      tasks: [
        {
          id: 5,
          title: 'Draft v1 of the technical requirements doc',
          priority: 'medium',
          completed: true,
          completedDate: 'Oct 10',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQzqRaiUprlXP6fA3pnJuMhxOf0NClwO-BEY3VdnRfDNKTL1Pczz2CuWJ1JQhSyhdGZLtK509M2GRti8LAupKC3tSDGs9hYpVJBHxozJbIsVhFTA-EmFc2WowVOmUf59MQzmrCsunSpKgfMT8jGm1sHDm6tXIipHPPt-nWbIDEpBfkSkJKYnF-GF7ORyXf-QekMtf-0nyaeyPV_f9pBUTRMZpe2tY7zwEjm61-dJi8U3-AftOEny3gqZI1uo1cZGLtuPZXXzOag',
          isCompleted: true,
          description: 'Complete technical requirements documentation v1'
        }
      ]
    }
  ])

  const teamAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA8VjZ3iO0Z1Lo9BWxPbU_POgAwJUOiUMF_tqEYWqizrJGWBMhcHXVkc0CE05CGI8a-D6q2hya7TZ9cZJou62dUah1Mh1pd-AuYFrKJ_c-hi9GM9i-eanKxr9f3X-fYtUTPPxtIla_8-B5u-5D2UkWzavGUvB8--MEqhfNp5KczGBFpBu8kd_E_IB78EQTOx8u4mvyl0NyRzlN2e9RAXIXt71hVhN-V4bvssReQeNlUCdNpZZ7MQpf1JEmRp-IatliIcJQpN2Mb8g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDadcZsDGy7RRTGGiL_-41DnRHh58G92ZdjFX-Egkl9KpOtaydIH1TfE_TDIAAY0LFojdPS80iZI-a9ldxf6T3XcQLbisa6fHk92rsg-uNJQ7w8F_uod2nk4abL-p_Oo7sW220Jcnc70KY3pV5lIaCPBAnwLjNboS-RgyQOgcUzzI6r2QTrXlxahKmQP-sauWoGQKnrOUxN_x78r1-vZWJ1HHHJGMllIIpcPOgwDE7Z8TRsxLKHVvw69DbCB5QQBX_t3FOIbFnqZQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBCKkdI1E7D-Pi_NsLRHP0Ho8XELC3AA_XO4nxT3ZKwBP2bi20tz3vMe5UpqsuCUxWhNYG5E_3gI3e8k5Tf5CAw_B29z9CkoIQ6sYNEDV50qSkIrI65QvAHePpqD1UpDJk3WRaUJeTj-J6GhfsY22GXhbC1glJfMZpza0VxtU_UojhXPlORTnnHa4LlCMSNqAQfx7490nAjvMLFzuzeYdaQty8RG7p6apU76jbhUKse-_oKFMJfFkZ1snJWvEPHfOqEbS__0BOxg'
  ]

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-badge--high'
      case 'medium':
        return 'priority-badge--medium'
      case 'low':
        return 'priority-badge--low'
      default:
        return 'priority-badge--medium'
    }
  }

  const getStatusClass = (color) => {
    switch (color) {
      case 'primary':
        return 'primary'
      case 'tertiary':
        return 'tertiary'
      default:
        return 'primary'
    }
  }

  const renderKanbanView = () => (
    <div className="kanban-board__content">
      {columns.map((column) => (
        <div key={column.id} className="kanban-board__column">
          <div className="column-header">
            <div className="column-title">
              <h4>{column.title}</h4>
              <span className="task-count">{column.taskCount}</span>
            </div>
            <button className="column-menu">
              <FiMoreHorizontal size={20} />
            </button>
          </div>

          <div className="column-content">
            {column.tasks.map((task) => {
              const StatusIcon = task.statusIcon;
              
              return (
              <div
                key={task.id}
                className={`task-card ${
                  column.id === 'in-progress' ? 'task-card--in-progress' : ''
                } ${task.isCompleted ? 'task-card--completed' : ''}`}
              >
                <div className="task-header">
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <button className="drag-handle">
                    <FiMove size={16} />
                  </button>
                </div>

                <h5 className="task-title">{task.title}</h5>

                <div className="task-footer">
                  {task.status ? (
                    <div className="task-meta">
                      {StatusIcon && <StatusIcon size={14} className="meta-icon" />}
                      
                      {task.status}
                    </div>
                  ) : (
                    <div className="task-meta">
                      <FiCalendar size={14} className="meta-icon" />
                      {task.dueDate}
                    </div>
                  )}

                  {task.assignees ? (
                    <div className="task-assignees">
                      {task.assignees.map((assignee, index) => (
                        <img
                          key={index}
                          src={assignee}
                          alt={`Assignee ${index + 1}`}
                          className="assignee"
                        />
                      ))}
                    </div>
                  ) : task.assignee ? (
                    <div className="task-assignees">
                      <img
                        src={task.assignee}
                        alt="Assignee"
                        className="assignee"
                      />
                    </div>
                  ) : null}
                </div>

                {task.hasTrendingIcon && (
                  <FiTrendingUp className="trending-icon" size={48} />
                )}
              </div>
            )})}
            
            <button 
              className="add-project-btn"
              onClick={() => setShowProjectForm(true)}
            >
              <FiPlus size={18} />
              Add Project
            </button>
          </div>
        </div>
      ))}

      <div className="kanban-board__add-column">
        <div className="add-column-content">
          <div className="add-icon">
            <FiPlus size={24} />
          </div>
          <p>Add Column</p>
        </div>
      </div>
    </div>
  )

  const renderListView = () => {
    const allTasks = columns.flatMap(column => 
      column.tasks.map(task => ({ ...task, column: column.title }))
    )

    return (
      <div className="list-view">
        <div className="list-header">
          <div className="list-header-cell">Task</div>
          <div className="list-header-cell">Status</div>
          <div className="list-header-cell">Priority</div>
          <div className="list-header-cell">Assignee</div>
          <div className="list-header-cell">Due Date</div>
          <div className="list-header-cell">Actions</div>
        </div>
        <div className="list-content">
          {allTasks.map((task) => (
            <div key={task.id} className="list-row">
              <div className="list-cell">
                <div className="task-info">
                  <h6>{task.title}</h6>
                  <p className="task-description">{task.description}</p>
                </div>
              </div>
              <div className="list-cell">
                <span className="status-badge">{task.column}</span>
              </div>
              <div className="list-cell">
                <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="list-cell">
                {task.assignees ? (
                  <div className="task-assignees">
                    {task.assignees.map((assignee, index) => (
                      <img
                        key={index}
                        src={assignee}
                        alt={`Assignee ${index + 1}`}
                        className="assignee"
                      />
                    ))}
                  </div>
                )  : (
                  <div className="unassigned">
                    <FiUser size={16} />
                  </div>
                )}
              </div>
              <div className="list-cell">
                <span className="due-date">{task.dueDate || task.completedDate}</span>
              </div>
              <div className="list-cell">
                <button className="action-btn">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTimelineView = () => {
    const allTasks = columns.flatMap(column => 
      column.tasks.map(task => ({ ...task, column: column.title }))
    ).sort((a, b) => new Date(a.dueDate || a.completedDate) - new Date(b.dueDate || b.completedDate))

    // Group tasks by date
    const tasksByDate = {}
    allTasks.forEach(task => {
      const date = task.dueDate || task.completedDate
      if (!tasksByDate[date]) {
        tasksByDate[date] = []
      }
      tasksByDate[date].push(task)
    })

    return (
      <div className="timeline-view">
        <div className="timeline-content">
          {Object.entries(tasksByDate).map(([date, tasks]) => (
            <div key={date} className="timeline-date-group">
              <div className="timeline-date-header">
                <span className="timeline-date">{date}</span>
              </div>
              <div className="timeline-tasks">
                {tasks.map((task, index) => (
                  <div key={task.id} className="timeline-item">
                    <div className="timeline-structure">
                      <div className="timeline-project-line">
                        <span className="project-name">{task.column}</span>
                        <span className="arrow-line">{'>'}</span>
                      </div>
                      {index === 0 && (
                        <div className="timeline-task-line">
                          <span className="task-name">{task.title}</span>
                          <div className="task-badge">
                            <span className="task-title-text">[{task.title}]</span>
                          </div>
                        </div>
                      )}
                      {index > 0 && (
                        <div className="timeline-subtask-line">
                          <span className="arrow">{'>'}</span>
                          <span className="subtask-name">{task.title}</span>
                          <div className="subtask-badge">
                            <span className="subtask-title-text">[{task.title}]</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="project-kanban-board">
      {/* Board Header */}
      <div className="kanban-board__header">
        <div className="header-left">
          <div className="project-info">
            <h3>Alpha Launch Sprint</h3>
            <div className="project-meta">
              <div className="team-avatars">
                {teamAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Team member ${index + 1}`}
                    className="avatar"
                  />
                ))}
                <div className="more-indicator">+4</div>
              </div>
              <div className="date-range">
                <FiCalendar size={16} />
                Oct 12 - Oct 26
              </div>
            </div>
          </div>
          
          <div 
            className="view-switcher"
            style={{
              display: 'flex',
              backgroundColor: '#f2f4f6',
              borderRadius: '12px',
              padding: '4px',
              gap: '4px'
            }}
          >
            <button
              className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: viewMode === 'kanban' ? '#3525cd' : 'transparent',
                color: viewMode === 'kanban' ? '#ffffff' : '#464555',
                transition: 'all 0.2s ease'
              }}
            >
              <FiLayout size={18} />
              Kanban
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: viewMode === 'list' ? '#3525cd' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#464555',
                transition: 'all 0.2s ease'
              }}
            >
              <FiList size={18} />
              List
            </button>
            <button
              className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: viewMode === 'timeline' ? '#3525cd' : 'transparent',
                color: viewMode === 'timeline' ? '#ffffff' : '#464555',
                transition: 'all 0.2s ease'
              }}
            >
              <FiTimeline size={18} />
              Timeline
            </button>
          </div>
        </div>
        
        <div className="board-actions">
          <button className="action-btn action-btn--secondary">
            <FiFilter size={18} />
            Filters
          </button>
          <button className="action-btn action-btn--primary">
            <FiShare size={18} />
            Share Board
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filters-left">
          <div className="search-box">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="filter-select"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="testing">Testing</option>
            <option value="done">Done</option>
          </select>

          <select 
            className="filter-select"
            value={filters.assignee}
            onChange={(e) => setFilters({...filters, assignee: e.target.value})}
          >
            <option value="all">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {teamAvatars.map((_, index) => (
              <option key={index} value={`user-${index}`}>User {index + 1}</option>
            ))}
          </select>

          <select 
            className="filter-select"
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <button 
          className="add-project-btn-main"
          onClick={() => setShowProjectForm(true)}
        >
          <FiPlus size={18} />
          Add Project
        </button>
      </div>

      {/* Content based on view mode */}
      <div className="board-content">
        {viewMode === 'kanban' && renderKanbanView()}
        {viewMode === 'list' && renderListView()}
        {viewMode === 'timeline' && renderTimelineView()}
      </div>

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
                <label>Assignee</label>
                <select>
                  <option value="">Unassigned</option>
                  {teamAvatars.map((_, index) => (
                    <option key={index} value={`user-${index}`}>User {index + 1}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="testing">Testing</option>
                  <option value="done">Done</option>
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

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="project-form-modal">
          <div className="project-form-overlay" onClick={() => setShowProjectForm(false)}></div>
          <div className="project-form-content">
            <div className="project-form-header">
              <h3>Create New Project</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProjectForm(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form className="project-form">
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" placeholder="Enter project name..." />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter project description..." rows={4}></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" />
                </div>
                
                <div className="form-group">
                  <label>Target Completion</label>
                  <input type="date" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Project Type</label>
                <select>
                  <option value="">Select project type...</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="research">Research</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Team Members</label>
                <select multiple>
                  {teamAvatars.map((_, index) => (
                    <option key={index} value={`user-${index}`}>User {index + 1}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn--secondary"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  <FiPlus size={16} />
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectKanbanBoard
