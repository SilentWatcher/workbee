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
  FiTrendingUp
} from 'react-icons/fi'
import './KanbanBoard.scss'

const KanbanBoard = () => {
  const [columns] = useState([
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
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCHbzk_bDm5OTrVrq5QF9ABHQFf64rYoA08Y2-JvEQXYKGqBCjEmMWIAxTEBBKP16al57QmlzQ6MS9eFZVALpBysOiEJE1tM776343bipbwzWe7GPctj3u6czGr15S6AHqUuyVnv3bm7U-H-R_OMju9iUhfB5Xt33wI1Fs7Sbd57ydL5JJpQsEmkmoiFEFQBYS3z8MRn8Qs4CetL2E-TZ_Akhq7tsPtL-07BmvcoHnCW72nfXTHWDawG1lmTk8tWOtNV1xK7iqHw'
        },
        {
          id: 2,
          title: 'Design system audit for accessibility compliance',
          priority: 'medium',
          dueDate: 'Oct 20',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeAEN_TQFKOqDl13wnSfVwUvDUNkA1_YjbLZj2ym80-lN0t2Ks5DGqAez8ZrdW12qhurkzbfEq7sIAedV9GnKKrn5dXLCIdebLtv4VCXn08m9SWR96kZnqlE8mhsT0nyM8L0ab1jM9vt_okijAZWQszq5TuT-HBjr3ICFVbhhebi52UWz1V9JzmHzUxPNtMbHFJ6swIG3jEkQlezZTusp14M7Z_FAjN4lGp3Gag0Un6ppaw2vvhDoWx_PIRzWwH5g0zBMxgepC9g'
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
          hasTrendingIcon: true
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
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8swrihisi5lo-PUSDf6kvc_N4yp_R_rwAKIlKi7qm8Xv9tLmRVCkdAuo6Uey0SKRHNU8CvBzHHQPZKBcpsK0wZTHivWvSTZJaMCy0BnDVGsEHyDnEITKU6_nw1uk5Ne7AMP8_YRcImXGLRpVTUNGaheydNvZej6j9MX4E83VE06LZ9nARNYf8xa9ijR6c_FELno9mwt0Fc_0Mwx5WMa9pDU1b_o_F8DDveI0yo5GPtGfWjKTD7n1A1D2OYTjM1Rch2x_dhbpjiw'
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
          title: 'Draft v1 of technical requirements doc',
          priority: 'medium',
          completed: true,
          completedDate: 'Oct 10',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQzqRaiUprlXP6fA3pnJuMhxOf0NClwO-BEY3VdnRfDNKTL1Pczz2CuWJ1JQhSyhdGZLtK509M2GRti8LAupKC3tSDGs9hYpVJBHxozJbIsVhFTA-EmFc2WowVOmUf59MQzmrCsunSpKgfMT8jGm1sHDm6tXIipHPPt-nWbIDEpBfkSkJKYnF-GF7ORyXf-QekMtf-0nyaeyPV_f9pBUTRMZpe2tY7zwEjm61-dJi8U3-AftOEny3gqZI1uo1cZGLtuPZXXzOag',
          isCompleted: true
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

  return (
    <div className="kanban-board">
      {/* Board Header */}
      <div className="kanban-board__header">
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

      {/* Kanban Columns */}
      <div className="kanban-board__content">
        {columns.map((column) => (
          <div key={column.id} className="kanban-board__column">
            {/* Column Header */}
            <div className="column-header">
              <div className="column-title">
                <h4>{column.title}</h4>
                <span className="task-count">{column.taskCount}</span>
              </div>
              <button className="column-menu">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {/* Column Content */}
            <div className="column-content">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${
                    column.id === 'in-progress' ? 'task-card--in-progress' : ''
                  } ${
                    task.isCompleted ? 'task-card--completed' : ''
                  }`}
                >
                  {/* Task Header */}
                  <div className="task-header">
                    <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                    <button className="drag-handle">
                      <FiMove size={16} />
                    </button>
                  </div>

                  {/* Task Title */}
                  <h5 className="task-title">{task.title}</h5>

                  {/* Task Footer */}
                  <div className="task-footer">
                    {task.status ? (
                      <div className="task-meta">
                        <task.statusIcon size={14} className="meta-icon" />
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

                  {/* Trending Icon for In Progress */}
                  {task.hasTrendingIcon && (
                    <FiTrendingUp className="trending-icon" size={48} />
                  )}
                </div>
              ))}

              {/* Add Task Button */}
              <button className="add-task-btn">
                <FiPlus size={18} />
                Add Task
              </button>
            </div>
          </div>
        ))}

        {/* Add Column CTA */}
        <div className="kanban-board__add-column">
          <div className="add-column-content">
            <div className="add-icon">
              <FiPlus size={24} />
            </div>
            <p>Add Column</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
