import React from 'react';
import type ReferralLink from './ReferralLink';

interface ReferralItemProps {
  Referral: ReferralLink;
  onDelete: (id: number) => void;
}

const ReferralLinkListItemComponent: React.FC<ReferralItemProps> = ({ Referral: ReferralLink, onDelete }) => {
  return (
    <li >
      {ReferralLink.title}
      <button onClick={() => onDelete(ReferralLink.id)}>Delete</button>
    </li>
  );
};

export default ReferralLinkListItemComponent;
