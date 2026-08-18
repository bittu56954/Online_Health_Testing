import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = '#0284c7', subtext }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.4rem' }}>
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          flexShrink: 0
        }}
      >
        {Icon && <Icon size={26} />}
      </div>
      <div>
        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.1rem 0' }}>{value}</h3>
        {subtext && <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{subtext}</p>}
      </div>
    </div>
  );
};

export default StatCard;
