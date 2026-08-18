import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex-center" style={{ padding: '3rem', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Loader2 size={36} className="animate-spin" style={{ color: '#0284c7' }} />
      <span style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>{text}</span>
    </div>
  );
};

export default LoadingSpinner;
