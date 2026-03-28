import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiCheckCircle, FiFileText, FiPlus, FiArrowRight } from 'react-icons/fi';
import './Activity.scss';

const Activity = () => {
  const activities = [
    {
      id: 1,
      user: 'Alex Rivera',
      action: 'completed task',
      target: 'Implement secure authentication for mobile endpoints',
      time: '2 hours ago',
      icon: FiCheckCircle,
      iconClass: 'icon-emerald',
      comment: 'Finally finished the JWT implementation. All tests are passing!'
    },
    {
      id: 2,
      user: 'Sarah Chen',
      action: 'added new comment to',
      target: 'API Infrastructure refactoring',
      time: '5 hours ago',
      icon: FiMessageSquare,
      iconClass: 'icon-blue',
      comment: 'Need more clarification on the load balancer configuration.'
    },
    {
      id: 3,
      user: 'Michael Scott',
      action: 'created new project',
      target: 'Q3 Marketing Strategy',
      time: 'Yesterday',
      icon: FiPlus,
      iconClass: 'icon-purple'
    },
    {
      id: 4,
      user: 'Elena Gilbert',
      action: 'uploaded documentation for',
      target: 'Design system audit',
      time: '2 days ago',
      icon: FiFileText,
      iconClass: 'icon-amber',
      comment: 'Attached the full accessibility report for Q4 review.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="activity-page">
      <header className="activity-page__header">
        <div className="header-info">
          <h1>Recent Activity</h1>
          <p>Stay updated with your team's latest progress</p>
        </div>
        <div className="header-filters">
          <select className="filter-select">
            <option>All Activities</option>
            <option>Comments</option>
            <option>Tasks</option>
            <option>Projects</option>
          </select>
        </div>
      </header>

      <motion.div 
        className="activity-page__feed"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {activities.map((activity) => (
          <motion.div 
            key={activity.id} 
            className="activity-card"
            variants={item}
            whileHover={{ x: 5, background: 'var(--surface-container-low)' }}
          >
            <div className={`activity-icon-wrapper ${activity.iconClass}`}>
              <activity.icon size={18} />
            </div>
            
            <div className="activity-content">
              <div className="activity-header">
                <p className="activity-text">
                  <span className="user-name">{activity.user}</span> {activity.action}{' '}
                  <span className="activity-target">{activity.target}</span>
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
              
              {activity.comment && (
                <div className="activity-comment">
                  <p>{activity.comment}</p>
                </div>
              )}

              <div className="activity-footer">
                <button className="view-btn">View Details <FiArrowRight size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Activity;
