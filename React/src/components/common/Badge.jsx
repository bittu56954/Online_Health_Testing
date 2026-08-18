import React from 'react';

export const Badge = ({ status, variant, children, icon }) => {
  let badgeClass = 'badge-gray';
  const val = (status || children || '').toString().toLowerCase();

  if (variant) {
    badgeClass = `badge-${variant}`;
  } else {
    if (['paid', 'resolved', 'active', 'occupied', 'success', 'checked_in'].includes(val)) {
      badgeClass = 'badge-success';
    } else if (['pending', 'in progress', 'assigned', 'partially_paid', 'warning'].includes(val)) {
      badgeClass = 'badge-warning';
    } else if (['overdue', 'failed', 'urgent', 'cancelled', 'inactive', 'terminated'].includes(val)) {
      badgeClass = 'badge-danger';
    } else if (['available', 'info', 'normal', 'checked_out'].includes(val)) {
      badgeClass = 'badge-info';
    } else if (['under_maintenance', 'important', 'meeting', 'owner', 'tenant'].includes(val)) {
      badgeClass = 'badge-purple';
    }
  }


  return (
    <span className={`badge ${badgeClass}`}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children || status}
    </span>
  );
};

export default Badge;
