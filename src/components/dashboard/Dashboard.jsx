import React from 'react'
import { 
  FiFolder, 
  FiCheckSquare, 
  FiUsers, 
  FiCalendar, 
  FiArrowRight,
  
  FiEdit3,
  FiSpeaker,
  FiTrendingUp,
  FiMoreVertical,
  FiCheck,
  FiMessageCircle,
  FiCheckCircle,
  FiPaperclip
} from 'react-icons/fi'
import { MdRocketLaunch } from "react-icons/md";



import './Dashboard.scss'

const Dashboard = () => {
  const statsData = [
    {
      icon: FiFolder,
      value: '24',
      label: 'Total Projects',
      badge: '+12%',
      badgeType: 'success',
      isCritical: false
    },
    {
      icon: FiCheckSquare,
      value: '142',
      label: 'Active Tasks',
      badge: 'Active',
      badgeType: 'info',
      isCritical: false
    },
    {
      icon: FiUsers,
      value: '18',
      label: 'Team Members',
      badge: 'Full Capacity',
      badgeType: 'info',
      isCritical: false
    },
    {
      icon: FiCalendar,
      value: '3',
      label: 'Upcoming Deadlines',
      badge: 'Critical',
      badgeType: 'error',
      isCritical: true
    }
  ]

  const workspacesData = [
    {
      icon: MdRocketLaunch,
      title: 'Product Launch',
      description: '12 Projects • 48 Tasks',
      colorClass: 'workspace-icon--indigo'
    },
    {
      icon: FiEdit3,
      title: 'Design System',
      description: '4 Projects • 126 Tasks',
      colorClass: 'workspace-icon--emerald'
    },
    {
      icon: FiSpeaker,
      title: 'Marketing Q3',
      description: '8 Projects • 32 Tasks',
      colorClass: 'workspace-icon--amber'
    },
    {
      icon: FiTrendingUp,
      title: 'Internal Audit',
      description: '2 Projects • 15 Tasks',
      colorClass: 'workspace-icon--purple'
    }
  ]

  const tasksData = [
    {
      title: 'Update Design System documentation',
      project: 'Precision Design System',
      dueDate: 'Due tomorrow',
      statusDot: '#3b82f6',
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdp6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDqYm5hAndIr8iHfDBRWHi2Feyetf8wfUb_m-6GvfNs6eZiveeLnofbyXUqoMgG8Lyrx-R-hlMBBr3UNHXvcAd2Ex2oB2t431OVhzGJFNXTV4R7n34PW_-MS94lL44MTkWs5Mke_34x2pRI06F2vK5HvJG51jttCUnH4MRkRnTyVQnytQUPHM6Gif_ztoUVv7T-J1QLm1VjOu7uy8O4iQFE1pmzB-ZsP16UKCNxgFCDb7YSpKtLRPA2bBAUZO_o2huONbgoKA3Izw'
      ]
    },
    {
      title: 'Review Q4 Product Roadmap with Stakeholders',
      project: 'Product Launch',
      dueDate: 'Oct 24',
      statusDot: '#f59e0b',
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDj4ci6LhgVt80TWOJHD111SWaLOGZEkE0CMOKOHLvhsf1KjkG7H-6wJs_L_qN1xf4t2QVJO8Pi7dtEH0E5kQG2tOMcaRqGO6FJQue23nP6StBX2BB1Qpp01xlljlz0UOimk-fGAY0u4RZ4V2fosFiXZxznIJ2Tue4htthNKhc8LtV6kSYy0TMHxeQ4H-935PZ5Q53VruQ2X21ZIb5atZlbDMfsH8XL2PlloLGQ8e8kSBdwt2xZOWgNdxfczAb6pq9dhI9Ya1LgOg'
      ]
    },
    {
      title: 'Draft final audit report for finance team',
      project: 'Internal Audit',
      dueDate: 'Oct 28',
      statusDot: '#8b5cf6',
      assignees: []
    }
  ]

  const activityData = [
    {
      icon: FiMessageCircle,
      iconClass: 'activity-icon--blue',
      user: 'Jordan S.',
      action: 'commented on',
      target: 'Hero Animation',
      time: '2 hours ago',
      comment: '"The easing on entrance looks much smoother now. Great work!"'
    },
    {
      icon: FiCheckCircle,
      iconClass: 'activity-icon--emerald',
      user: 'Emma Wilson',
      action: 'completed',
      target: 'API Integration',
      time: '5 hours ago'
    },
    {
      icon: FiPaperclip,
      iconClass: 'activity-icon--amber',
      user: 'Marcus Chen',
      action: 'uploaded 4 files to',
      target: 'Brand Assets',
      time: 'Yesterday'
    }
  ]

  const chartBars = [60, 40, 80, 55, 95, 45, 70]

  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        {/* Main Content Area */}
        <div className="dashboard__main">
          {/* Priority Tasks Section - Top Left (Primary Focus) */}
          <section className="dashboard__section dashboard__tasks">
            <div className="section-header">
              <div className="section-title">
                <h2>My Priority Tasks</h2>
                <p>Focused list of your immediate action items.</p>
              </div>
              <div className="task-filters">
                <span className="filter-chip filter-chip--active">In Progress</span>
                <span className="filter-chip">Upcoming</span>
              </div>
            </div>
            
            <div className="tasks-list">
              {tasksData.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-left">
                    <button className="task-checkbox" aria-label="Mark task as complete">
                      <FiCheck size={12} className="check-icon" />
                    </button>
                    <div className="task-content">
                      <h4>{task.title}</h4>
                      <div className="task-meta">
                        <span 
                          className="status-dot" 
                          style={{ backgroundColor: task.statusDot }}
                          title="Task Status"
                        ></span>
                        <span className="project-name">{task.project}</span>
                        <span className="meta-separator">•</span>
                        <span className="due-date">{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="task-right">
                    {task.assignees.length > 0 && (
                      <div className="task-assignees">
                        {task.assignees.map((assignee, idx) => (
                          <img
                            key={idx}
                            src={assignee}
                            alt="Team member"
                            className="assignee-avatar"
                          />
                        ))}
                      </div>
                    )}
                    <button className="task-menu-btn" aria-label="Task options">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-footer">
              <button className="view-all-btn">
                View all tasks <FiArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* Workspaces Section */}
          <section className="dashboard__section dashboard__workspaces">
            <div className="section-header">
              <div className="section-title">
                <h2>Active Workspaces</h2>
                <p>Your specialized project environments.</p>
              </div>
            </div>
            <div className="workspaces-grid">
              {workspacesData.map((workspace, index) => (
                <div key={index} className="workspace-card">
                  <div className={`workspace-icon ${workspace.colorClass}`}>
                    <workspace.icon size={20} />
                  </div>
                  <div className="workspace-info">
                    <h4>{workspace.title}</h4>
                    <p>{workspace.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Secondary Content */}
        <div className="dashboard__sidebar">
          {/* Summary Stats - Secondary Focus */}
          <div className="dashboard__stats-mini">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className={`stat-pill ${stat.isCritical ? 'stat-pill--critical' : ''}`}
              >
                <div className="stat-pill-icon">
                  <stat.icon size={16} />
                </div>
                <div className="stat-pill-content">
                  <span className="stat-pill-label">{stat.label}</span>
                  <span className="stat-pill-value">{stat.value}</span>
                </div>
                {stat.badge && (
                  <span className="stat-pill-badge">{stat.badge}</span>
                )}
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <section className="dashboard__section dashboard__activity">
            <div className="section-header">
              <div className="section-title">
                <h2>Recent Activity</h2>
              </div>
            </div>
            <div className="activity-feed">
              {activityData.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon-wrapper ${activity.iconClass}`}>
                    <activity.icon size={14} />
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">
                      <span className="user-name">{activity.user}</span> {activity.action}{' '}
                      <span className="activity-link">{activity.target}</span>
                    </p>
                    <span className="activity-time">{activity.time}</span>
                    {activity.comment && (
                      <div className="activity-comment">
                        <p>{activity.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="show-more-btn">See all activity</button>
          </section>

          {/* Project Velocity */}
          <section className="dashboard__section dashboard__velocity">
            <div className="section-header">
              <div className="section-title">
                <h2>Team Velocity</h2>
              </div>
              <div className="velocity-value">84%</div>
            </div>
            <div className="velocity-chart">
              {chartBars.map((height, index) => (
                <div 
                  key={index} 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                  title={`${height}% efficiency`}
                ></div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
