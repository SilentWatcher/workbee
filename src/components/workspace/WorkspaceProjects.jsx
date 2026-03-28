import React, { useState } from 'react'
import { 
  FiFilter,
  FiPlus,
  FiMoreVertical,
  FiDownload,
  FiEye,
  FiSearch,
  FiX,
  FiCheck,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiAlertCircle,
  FiClock,
  FiEdit3,
  FiFolder
} from 'react-icons/fi'
import { MdRocketLaunch } from "react-icons/md"
import { triggerProjectCompletionConfetti, triggerTaskCompletionConfetti } from '../../utils/confetti'
import './WorkspaceProjects.scss'

const WorkspaceProjects = () => {
  const [showNewWorkspaceForm, setShowNewWorkspaceForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectType: '',
    startDate: '',
    targetCompletion: '',
    teamMembers: []
  })

  const projectsData = [
    {
      id: 1,
      title: 'Astra Design System',
      description: 'Developing a unified visual language for next generation of aerospace interfaces.',
      progress: 75,
      status: 'active',
      icon: FiEdit3,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuACL3u1opegGNUIryhkWA-IxfSbWcRNKL9S23bLiYZqKE89sX5vtEvUoMz-smQNdhvmYqE27ztoWMhuzBYCxLGnVok8Yc-EIgC693muyGqHJDsOEPV-ulLwKBa0ZU0Z8kr2HXWmYla7rE7URO6OvdmaUD_w0EYstNG3aRoLikwpkR0Xu1dVLoSbTYcTavBVU9O9ijeC7H558qtU1KX1q1mXmJy7HK_jsfizAXwEUrhzdT3zkaSxSI0RZCeJR7n-ZBujENM2ZnHpNg',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDlV6KWdr0YdPwdAZXVPlFBvGEz95c42wn26QMaSC_jQxRwRtB6tobfZMI1J1pe432OLrnKCuK0NryO5X2VbLrByKODXsnmkGi7n77NOe9NEdrSB279Sdtt5fkwGrXtvwcTTxCFIft4Q4oP8HaebWfPCpvvNGKwUqW7d_1SvS_UWx4AqUoJDscfyjQjflUh4BaTwr4sFqr2UgHIIqHI5bApHYPp1kpYQWHrpVTusxcTUZ-59o2hWw_sYvbXLU1T45xYKOICxTqgyw'
      ],
      teamCount: 6
    },
    {
      id: 2,
      title: 'EcoTrack Mobile',
      description: 'Carbon footprint tracking application with real-time analytics and gamified rewards.',
      progress: 42,
      status: 'in-review',
      icon: FiTrendingUp,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCPxF2CpdnPotUg8ObbgKzPbjRFPWUSCyhRiXjHYEtFqpBpIwKr8jmOr4jmNDWZEKEvZvFG-VN42UTOM_E6RG-CHWPCv2e9uFPoJBx83kKYgRvBn1IFs79U9OkYfaDCM4d20MMi1CbZ79j7LAKp4fT9aesr05wOeMIrECFprtXkFZOZhrDYAYmR3IJHl-XebEcyGVUw4xYSAfQYajv-S6WE1_A4iQgCPK9w-HzwIn1vaWSeLQkezyUlVCRai-wOV4Ajd8klRzKYIw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDiolvlg3z_-CyNYC8NaQ7-NGFJDrY6wWe8YUtyu9V4Xo_PqMalaarYiomLW-9A3A1zv-eeMuCCXGMcimsaN4TcakASZSAFK0x-OSBt0xpn2vi68Fuuz3QQ9hGXYwPCiMHqPiBF-cxH2Y1LCfDqb-XVbydx4Vdj2drvbLtID81_8gl-t8VKnWOkjuQ5MjnFcnIhvSU1_8YObNKTvn-u_crayHZ9NHehjTTTrrfZylca7ax0CokPpKeCWk2AzXktjSFHXZav5cozwQ'
      ],
      teamCount: 2
    },
    {
      id: 3,
      title: 'Q4 Launch Campaign',
      description: 'Strategic rollout and multi-channel marketing push for flagship product release.',
      progress: 92,
      status: 'urgent',
      icon: MdRocketLaunch,
      iconBg: 'bg-primary',
      iconColor: 'text-white',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCd_hPMVgxCuWG2I0dbhiknQ16HWKTwueZZn6eUbeYV1jsPtq0Pqf2ZegoXzwORK2rTpDyx88rdYpJ7O_gcgGUyivniudv_70oe3ekaY8QubXYBfDU6Y65GYFonqE33Yu6tM0LmD0vZVb4Pu2cUKqgZ8eRlVCeEPvZfcVbBEiZ68IecPVaZYr6Es2eKimyHapMCy8JDMcCUk4zdjAmi43BFNMOPWswP59vxme7IiHO-ihVEkRa-R4pqeVzgSEEbAuyRbAxYphFU7g'
      ],
      teamCount: 1,
      isHero: true
    },
    {
      id: 4,
      title: 'Data Migrator v2',
      description: 'Scaling backend infrastructure to handle 10x current throughput.',
      progress: 15,
      status: 'backlog',
      icon: FiFolder,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3yozngkh8-L3vmfDBgpRlAngQFtk587Hv-DCpC6yrzUxMpU0xSsedFYPTpw-MpfijTS42wwGy2b2LNwf05vl42n0Ivr1ISVATaktzfUbGDf44ug-OK2JeNgOd4q_WZqTCma4WP8h7Z43UqguSXhueaGR3v9pciiWi5mzzX1vrUlIxcbwwaJ7XeZy2IVJB_GrgyV0bugC5mYLM-omQ7OMOXK0oll2up-4Y_7JtVzahPmjAac51rzQ2r5dhS0Go3S5-Dk9tsvo3w'
      ],
      teamCount: 1
    },
    {
      id: 5,
      title: 'Auth Protocols',
      description: 'End-to-end security audit and implementation of biometric secondary factors.',
      progress: 60,
      status: 'active',
      icon: FiAlertCircle,
      iconBg: 'bg-white',
      iconColor: 'text-error',
      riskLevel: 'high',
      dueIn: '4 days',
      team: [],
      teamCount: 0
    }
  ]

  const [projects, setProjects] = useState(projectsData)

  const recentDeliverables = [
    {
      id: 1,
      name: 'Brand Guidelines v1.2',
      status: 'completed',
      owner: 'Marcus Chen',
      ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcxQWgyR8hkLJuegUGBRfUhZz6sdGzu_IMbCbat-DgiYm0ih3AKbS4DDvXuAGRCeLdolvv-fXIA2YW2Z2f_tPtYN1s5qzzEkX3AUUKnEOt_3pjc9h-wOmFdwFNi6j_Q3KTmg8RqNs6Ma3stovjBzBamN7vfyKTZ7-Yk8fh_AUnVIID10_kCpMaD0JQn8QPh--FIxYGGG2ZGnVU0jgHYBu3hA--ETGaxjaq6SqPy8DRBr9ufq7icz3oEkpCqm9dcIPWIpAsRV54g',
      date: 'Oct 12, 2023'
    },
    {
      id: 2,
      name: 'System Architecture Map',
      status: 'in-progress',
      owner: 'Sarah Jenkins',
      ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr2ghT3lYftweZ1nXjYe-2wDmyuXpK9mexT6ZrswC41k6yossNmdGP6uDKxsJQPuW-XDbA70yKHryjFRrIpeC5f3sLItPYCyBTtO8H_bl9sqXyySj1AqBxW9c7NkZlhuTD9oqrOlT8p8kvq5j8pfnTWD-Fbmk_DtgEgQfw5enr7hHBImw0ge9tTDhKCfDUaCsRJsniNc4WT1nIts63tgJ42CimkkPRmYTSDgct_JJidd-cDPAxxTsoXR4Gp41fVixIDSyodXcuw',
      date: 'Oct 15, 2023'
    }
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active'
      case 'in-review':
        return 'status-in-review'
      case 'urgent':
        return 'status-urgent'
      case 'backlog':
        return 'status-backlog'
      default:
        return 'status-active'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'in-review':
        return 'In Review'
      case 'urgent':
        return 'Urgent'
      case 'backlog':
        return 'Backlog'
      default:
        return 'Active'
    }
  }

  const handleProjectComplete = (projectId) => {
    // Trigger confetti for project completion
    triggerProjectCompletionConfetti()
    
    // You could also update the project status here
    console.log(`Project ${projectId} completed!`)
  }

  const handleWorkspaceCreate = () => {
    // Trigger confetti for creating a new workspace
    triggerTaskCompletionConfetti()
    
    // Create new project with mock data
    const newProject = {
      id: projects.length + 1,
      title: newTask.title || 'New Project',
      description: newTask.description || 'New project description',
      progress: 0,
      status: 'active',
      icon: FiFolder,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      team: [],
      teamCount: 0
    }
    
    // Add to projects list
    setProjects([...projects, newProject])
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      projectType: '',
      startDate: '',
      targetCompletion: '',
      teamMembers: []
    })
    
    setShowNewWorkspaceForm(false)
  }

  const handleInputChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="workspace-projects">
      {/* Header */}
      <div className="workspace-header">
        <div className="header-left">
          <p className="breadcrumb">Work Bee / Workspace</p>
          <h1 className="page-title">Design Engineering</h1>
        </div>
        <div className="header-actions">
          <button className="sort-btn">
            <FiFilter size={16} />
            Sort by Recent
          </button>
          <button 
            className="new-project-btn"
            onClick={() => setShowNewWorkspaceForm(true)}
          >
            <FiPlus size={16} />
            New Workspace
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <FiSearch size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-card ${project.isHero ? 'project-card--hero' : ''}`}
          >
            {project.isHero ? (
              // Hero Card
              <div className="hero-card">
                <div className="hero-bg"></div>
                <div className="hero-content">
                  <div className="project-icon">
                    <project.icon size={32} />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="team-section">
                      {project.team.map((member, index) => (
                        <img
                          key={index}
                          src={member}
                          alt={`Team member ${index + 1}`}
                          className="team-avatar"
                        />
                      ))}
                    </div>
                    <div className="footer-actions">
                      <span className="status-badge status-urgent">Urgent</span>
                      <button 
                        className="complete-project-btn"
                        onClick={() => handleProjectComplete(project.id)}
                      >
                        <FiCheck size={16} />
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Regular Card
              <>
                <div className="card-header">
                  <div className={`project-icon ${project.iconBg}`}>
                    <project.icon size={24} className={project.iconColor} />
                  </div>
                  <button className="card-menu">
                    <FiMoreVertical size={20} />
                  </button>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {project.riskLevel ? (
                  <div className="risk-section">
                    <div className="risk-header">
                      <span>Risk Assessment</span>
                      <span className="risk-high">High</span>
                    </div>
                    <div className="risk-bar">
                      <div 
                        className="risk-fill" 
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <div className="due-info">
                      <FiClock size={12} />
                      <span>Due in {project.dueIn}</span>
                    </div>
                  </div>
                ) : (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="card-footer">
                  <div className="team-section">
                    {project.team.length > 0 ? (
                      <>
                        {project.team.map((member, index) => (
                          <img
                            key={index}
                            src={member}
                            alt={`Team member ${index + 1}`}
                            className="team-avatar"
                          />
                        ))}
                        {project.teamCount > project.team.length && (
                          <div className="more-members">
                            +{project.teamCount - project.team.length}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="unassigned">
                        <FiUsers size={16} />
                        <span>Unassigned</span>
                      </div>
                    )}
                  </div>
                  <span className={`status-badge ${getStatusClass(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Add New Workspace Card */}
        <button 
          className="add-project-card"
          onClick={() => setShowNewWorkspaceForm(true)}
        >
          <div className="add-icon">
            <FiPlus size={24} />
          </div>
          <span className="add-text">Start New Workspace</span>
          <span className="add-subtext">Create a custom workflow</span>
        </button>
      </div>

      {/* Recent Deliverables Table */}
      <div className="deliverables-section">
        <h2 className="section-title">Recent Deliverables</h2>
        <div className="deliverables-table">
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Timeline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentDeliverables.map((item) => (
                <tr key={item.id}>
                  <td className="resource-name">{item.name}</td>
                  <td>
                    <span className={`status-indicator ${item.status === 'completed' ? 'completed' : 'in-progress'}`}>
                      <span className="status-dot"></span>
                      {item.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td>
                    <div className="owner-info">
                      <img src={item.ownerAvatar} alt={item.owner} className="owner-avatar" />
                      <span>{item.owner}</span>
                    </div>
                  </td>
                  <td className="timeline">{item.date}</td>
                  <td className="actions">
                    <button className="action-btn">
                      {item.status === 'completed' ? <FiDownload size={18} /> : <FiEye size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Workspace Modal */}
      {showNewWorkspaceForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Workspace</h2>
              <button 
                className="close-btn"
                onClick={() => setShowNewWorkspaceForm(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form className="workspace-form" onSubmit={(e) => {
                e.preventDefault()
                handleWorkspaceCreate()
              }}>
              <div className="form-group">
                <label>Workspace Name</label>
                <input 
                  type="text" 
                  placeholder="Enter workspace name..." 
                  value={newTask.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Describe the purpose of this workspace..." 
                  rows={4}
                  value={newTask.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Project Type</label>
                <select 
                  value={newTask.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                >
                  <option value="">Select project type...</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={newTask.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Target Completion</label>
                  <input 
                    type="date" 
                    value={newTask.targetCompletion}
                    onChange={(e) => handleInputChange('targetCompletion', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Team Members</label>
                <select multiple>
                  <option value="user1">Alex Rivera</option>
                  <option value="user2">Sarah Jenkins</option>
                  <option value="user3">Marcus Chen</option>
                  <option value="user4">Emma Wilson</option>
                  <option value="user5">Jordan Smith</option>
                </select>
                <small>Hold Ctrl/Cmd to select multiple team members</small>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn--secondary"
                  onClick={() => setShowNewWorkspaceForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  <FiPlus size={16} />
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspaceProjects
