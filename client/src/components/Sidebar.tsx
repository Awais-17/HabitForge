import React, { useState } from 'react';
import { User, Award, Crown, Zap, Target, Coffee, Edit2, Check, X, LayoutDashboard, Trophy, Clock } from 'lucide-react';

interface SidebarProps {
  user: any;
  onUpdateProfile?: (updates: { name?: string; email?: string }) => void;
  activePage?: string;
  setActivePage?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onUpdateProfile, activePage, setActivePage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const xpToNextLevel = (Math.pow((user.level + 1) / 0.2, 2));
  const xpCurrentLevel = (Math.pow((user.level) / 0.2, 2));
  const progress = ((user.xp - xpCurrentLevel) / (xpToNextLevel - xpCurrentLevel)) * 100;

  const getBadgeIcon = (badgeId: string) => {
    switch (badgeId) {
      case 'rookie': return <Award size={16} color="#94a3b8" />;
      case 'consistency_king': return <Crown size={16} color="#f59e0b" />;
      case 'habit_starter': return <Zap size={16} color="#0ea5e9" />;
      case 'century_club': return <Target size={16} color="#ec4899" />;
      case 'early_bird': return <Coffee size={16} color="#10b981" />;
      default: return <Award size={16} />;
    }
  };

  const getBadgeName = (badgeId: string) => {
    return badgeId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleSaveProfile = () => {
    if (onUpdateProfile && editName.trim()) {
      onUpdateProfile({ name: editName.trim() });
    }
    setIsEditing(false);
  };

  return (
    <aside className="sidebar">
      <div className="user-profile card glass-card">
        <div className="avatar">
          <User size={48} color="#2E5090" />
        </div>
        
        {isEditing ? (
          <div className="edit-profile-form">
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              className="profile-input"
              autoFocus
            />
            <div className="edit-actions">
              <button onClick={handleSaveProfile} className="btn-icon text-success"><Check size={18} /></button>
              <button onClick={() => { setIsEditing(false); setEditName(user.name); }} className="btn-icon text-dim"><X size={18} /></button>
            </div>
          </div>
        ) : (
          <div className="profile-header">
            <h2>{user.name}</h2>
            <button onClick={() => setIsEditing(true)} className="btn-icon edit-btn" title="Edit Profile">
              <Edit2 size={14} />
            </button>
          </div>
        )}
        
        <div className="level-badge">Level {user.level}</div>
      </div>

      <div className="xp-section card glass-card">
        <div className="xp-info">
          <span>XP</span>
          <span>{Math.floor(user.xp)} / {Math.floor(xpToNextLevel)}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="badges-collection card glass-card">
        <h3>Badge Collection</h3>
        <div className="badges-grid">
          {user.badges && user.badges.length > 0 ? (
            user.badges.map((badgeId: string) => (
              <div key={badgeId} className="badge-item" title={getBadgeName(badgeId)}>
                {getBadgeIcon(badgeId)}
              </div>
            ))
          ) : (
            <p className="text-dim small">No badges yet. Start checking off habits!</p>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage?.('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </li>
          <li className={activePage === 'achievements' ? 'active' : ''} onClick={() => setActivePage?.('achievements')}>
            <Trophy size={20} /> Achievements
          </li>
          <li className={activePage === 'productivity' ? 'active' : ''} onClick={() => setActivePage?.('productivity')}>
            <Clock size={20} /> Productivity
          </li>
        </ul>
      </nav>
      
      {user.isPremium && (
        <div className="premium-tag">PRO MEMBER</div>
      )}
    </aside>
  );
};

export default Sidebar;
