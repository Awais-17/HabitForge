import React from 'react';
import { Lock } from 'lucide-react';

interface PremiumGateProps {
  isPremium: boolean;
  children: React.ReactNode;
  onUpgrade: () => void;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ isPremium, children, onUpgrade }) => {
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="premium-gate">
      <div className="gate-content">
        <Lock size={48} color="#94a3b8" />
        <h3>Pro Feature</h3>
        <p>Advanced analytics like heatmaps are only available to Pro members.</p>
        <button className="btn btn-primary" onClick={onUpgrade}>Upgrade to HabitForge Pro</button>
      </div>
    </div>
  );
};

export default PremiumGate;
