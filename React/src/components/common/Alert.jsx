import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const Alert = ({ type = 'info', message }) => {
  if (!message) return null;

  const icons = {
    danger: <AlertCircle size={20} />,
    success: <CheckCircle2 size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`alert alert-${type}`}>
      {icons[type] || icons.info}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
