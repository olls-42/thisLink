import React from 'react';

interface ReferralItemProps {
  Referral: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ReferralItemComponent: React.FC<ReferralItemProps> = ({ Referral, onToggle, onDelete }) => {
  return (
    <li style={{ textDecoration: Referral.completed ? 'line-through' : 'none' }}>
      {Referral.text}
      <button onClick={() => onToggle(Referral.id)}>
        {Referral.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => onDelete(Referral.id)}>Delete</button>
    </li>
  );
};

export default ReferralItemComponent;
