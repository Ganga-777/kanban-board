
import React from 'react';

const StatusIcon = ({ status }) => {
  switch (status.toLowerCase()) {
    case 'todo':
      return <span className="status-icon todo">○</span>;
    case 'in progress':
      return <span className="status-icon in-progress">◐</span>;
    case 'done':
      return <span className="status-icon done">●</span>;
    case 'canceled':
      return <span className="status-icon canceled">○</span>;
    default:
      return <span className="status-icon">•</span>;
  }
};

export default StatusIcon;