import React, { useState } from 'react';
import '../styles/DisplayOptions.css';

const DisplayOptions = ({ grouping, setGrouping, sorting, setSorting }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-options">
      <button onClick={() => setIsOpen(!isOpen)} className="display-button">
        <span className="display-icon">☰</span> Display <span className="arrow-down">▼</span>
      </button>
      {isOpen && (
        <div className="options-dropdown">
          <div className="option">
            <span>Grouping</span>
            <select 
              value={grouping} 
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <span>Ordering</span>
            <select 
              value={sorting} 
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
