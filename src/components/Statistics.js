import React from 'react';
import '../styles/Statistics.css';

const Statistics = ({ tickets }) => {
  const totalTickets = tickets.length;
  const completedTickets = tickets.filter(ticket => ticket.status === 'Done').length;
  const highPriorityTickets = tickets.filter(ticket => ticket.priority >= 3).length;

  return (
    <div className="statistics">
      <h3>Ticket Statistics</h3>
      <div className="stat-item">
        <span>Total Tickets:</span>
        <span>{totalTickets}</span>
      </div>
      <div className="stat-item">
        <span>Completed Tickets:</span>
        <span>{completedTickets}</span>
      </div>
      <div className="stat-item">
        <span>Completion Rate:</span>
        <span>{((completedTickets / totalTickets) * 100).toFixed(1)}%</span>
      </div>
      <div className="stat-item">
        <span>High Priority Tickets:</span>
        <span>{highPriorityTickets}</span>
      </div>
    </div>
  );
};

export default Statistics;