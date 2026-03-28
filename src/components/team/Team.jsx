import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiTwitter, FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import './Team.scss';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Lead Designer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEzucP8SEaQ7I0sK5GpbVfGF0Z9w6QsuFn1fquFVEumUzPkbesEtMAyeEfHl16_OgEmK5JHOlsARpkXjfnrGjVkagQl3nOfo01R2b9q9CD1K3OEj368SjSd6kvIMI_s40rL7yL2erWVd3LGEzRPkNOqGQn6aTU7PrEPHYXuO4k_PEUGjOKKRiKfJEFYZ4ilFf2ZTQ5grwXAXJWCTlos4VPxZSFERR16wB9Y98tq45oA1oS7tYjuE66UWqCoZ-DHq8072F-swj9DA',
      status: 'active',
      projects: 12,
      tasks: 45
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeAEN_TQFKOqDl13wnSfVwUvDUNkA1_YjbLZj2ym80-lN0t2Ks5DGqAez8ZrdW12qhurkzbfEq7sIAedV9GnKKrn5dXLCIdebLtv4VCXn08m9SWR96kZnqlE8mhsT0nyM8L0ab1jM9vt_okijAZWQszq5TuT-HBjr3ICFVbhhebi52UWz1V9JzmHzUxPNtMbHFJ6swIG3jEkQlezZTusp14M7Z_FAjN4lGp3Gag0Un6ppaw2vvhDoWx_PIRzWwH5g0zBMxgepC9g',
      status: 'active',
      projects: 8,
      tasks: 32
    },
    {
      id: 3,
      name: 'Michael Scott',
      role: 'Product Manager',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQzqRaiUprlXP6fA3pnJuMhxOf0NClwO-BEY3VdnRfDNKTL1Pczz2CuWJ1JQhSyhdGZLtK509M2GRti8LAupKC3tSDGs9hYpVJBHxozJbIsVhFTA-EmFc2WowVOmUf59MQzmrCsunSpKgfMT8jGm1sHDm6tXIipHPPt-nWbIDEpBfkSkJKYnF-GF7ORyXf-QekMtf-0nyaeyPV_f9pBUTRMZpe2tY7zwEjm61-dJi8U3-AftOEny3gqZI1uo1cZGLtuPZXXzOag',
      status: 'on_leave',
      projects: 5,
      tasks: 12
    },
    {
      id: 4,
      name: 'Elena Gilbert',
      role: 'Frontend Developer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCHbzk_bDm5OTrVrq5QF9ABHQFf64rYoA08Y2-JvEQXYKGqBCjEmMWIAxTEBBKP16al57QmlzQ6MS9eFZVALpBysOiEJE1tM776343bipbwzWe7GPctj3u6czGr15S6AHqUuyVnv3bm7U-H-R_OMju9iUhfB5Xt33wI1Fs7Sbd57ydL5JJpQsEmkmoiFEFQBYS3z8MRn8Qs4CetL2E-TZ_Akhq7tsPtL-07BmvcoHnCW72nfXTHWDawG1lmTk8tWOtNV1xK7iqHw',
      status: 'active',
      projects: 6,
      tasks: 24
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="team">
      <header className="team__header">
        <div className="header-info">
          <h1>Team Members</h1>
          <p>Collaborate with your workspace team</p>
        </div>
        <button className="invite-btn">
          <FiPlus /> Invite Member
        </button>
      </header>

      <motion.div 
        className="team__grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {teamMembers.map((member) => (
          <motion.div 
            key={member.id} 
            className="member-card"
            variants={item}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="card-header">
              <div className={`status-badge status-badge--${member.status}`}>
                {member.status.replace('_', ' ')}
              </div>
              <button className="menu-btn"><FiMoreHorizontal /></button>
            </div>
            
            <div className="card-profile">
              <div className="avatar-wrapper">
                <img src={member.avatar} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>

            <div className="card-stats">
              <div className="stat">
                <span className="stat-value">{member.projects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-value">{member.tasks}</span>
                <span className="stat-label">Tasks</span>
              </div>
            </div>

            <div className="card-actions">
              <button className="action-icon"><FiMail /></button>
              <button className="action-icon"><FiLinkedin /></button>
              <button className="action-icon"><FiTwitter /></button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Team;
