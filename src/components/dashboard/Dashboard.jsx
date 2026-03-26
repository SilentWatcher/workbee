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
      {/* Summary Statistics Bento Grid */}
      <div className="dashboard__stats-grid">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className={`stat-card ${stat.isCritical ? 'stat-card--critical' : ''}`}
          >
            <div className="stat-header">
              <stat.icon className="stat-icon" />
              <span className="stat-badge">{stat.badge}</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__content-grid">
        {/* Left Column: Workspaces & Tasks */}
        <div className="dashboard__content-grid-left">
          {/* Workspaces Section */}
          <section className="dashboard__section dashboard__workspaces">
            <div className="section-header">
              <div>
                <h2>Active Workspaces</h2>
                <p>Manage and access your specialized project environments.</p>
              </div>
              <a href="#" className="view-all-btn">
                View All <FiArrowRight size={16} />
              </a>
            </div>
            <div className="workspaces-grid">
              {workspacesData.map((workspace, index) => (
                <div key={index} className="workspace-card">
                  <div className={`workspace-icon ${workspace.colorClass}`}>
                    <workspace.icon size={24} />
                  </div>
                  <div className="workspace-info">
                    <h4>{workspace.title}</h4>
                    <p>{workspace.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Tasks Widget */}
          <section className="dashboard__section dashboard__tasks">
            <div className="tasks-header">
              <h2>My Priority Tasks</h2>
              <div className="task-filters">
                <span className="filter-chip">All Tasks</span>
                <span className="filter-chip filter-chip--active">In Progress</span>
              </div>
            </div>
            <div className="tasks-list">
              {tasksData.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-left">
                    <button className="task-checkbox">
                      <FiCheck size={12} className="check-icon" />
                    </button>
                    <div className="task-content">
                      <h4>{task.title}</h4>
                      <div className="task-meta">
                        <span 
                          className="status-dot" 
                          style={{ backgroundColor: task.statusDot }}
                        ></span>
                        {task.project} • {task.dueDate}
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
                            alt={`Assignee ${idx + 1}`}
                            className="assignee-avatar"
                          />
                        ))}
                      </div>
                    )}
                    <FiMoreVertical className="task-menu" size={20} />
                  </div>
                </div>
              ))}
            </div>
            <div className="tasks-footer">
              <button className="view-all-tasks">View all 14 upcoming tasks</button>
            </div>
          </section>
        </div>

        {/* Right Column: Activity Feed & Team */}
        <div className="dashboard__content-grid-right">
          {/* Recent Activity Feed */}
          <section className="dashboard__section dashboard__activity">
            <h2>Recent Activity</h2>
            <div className="activity-feed">
              {activityData.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.iconClass}`}>
                    <activity.icon size={16} />
                  </div>
                  <div className="activity-content">
                    <p>
                      <strong>{activity.user}</strong> {activity.action}{' '}
                      <span className="activity-link">{activity.target}</span>
                    </p>
                    <p className="activity-time">{activity.time}</p>
                    {activity.comment && (
                      <div className="activity-comment">
                        <p>{activity.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="show-more-btn">Show More Activity</button>
          </section>

          {/* Project Timeline Mini */}
          <section className="dashboard__section dashboard__velocity">
            <div className="velocity-header">
              <h2>Project Velocity</h2>
              <p>Tracking your team's efficiency this week.</p>
            </div>
            <div className="velocity-chart">
              {chartBars.map((height, index) => (
                <div 
                  key={index} 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="velocity-stats">
              <div className="stat">
                <p className="value">84%</p>
                <p className="label">Weekly Target</p>
              </div>
              <FiTrendingUp className="trend-icon" size={40} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
