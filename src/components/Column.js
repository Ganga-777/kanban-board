import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { ReactComponent as TodoIcon } from '../components/icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from '../components/icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from '../components/icons_FEtask/Done.svg';
import { ReactComponent as CancelledIcon } from '../components/icons_FEtask/Cancelled.svg';
import { ReactComponent as PlusIcon } from '../components/icons_FEtask/add.svg';
import { ReactComponent as EllipsisIcon } from '../components/icons_FEtask/3 dot menu.svg';
import '../styles/Column.css';

const Column = ({ title, tickets, grouping, userAvatars, handleAddTicket, handleMoreOptions }) => {

  const getColumnIcon = () => {
    switch (grouping) {
      case 'user':
        return <img src={userAvatars[title]} alt="User Avatar" className="column-icon user-avatar" />;
      case 'priority':
        // You might want to create priority icons here
        return <span className="column-icon priority-icon">{title}</span>;
      default:
        // Return status icons (Todo, In Progress, Done) based on the column title/status
        return getStatusIcon(title);
    }
  };

  // Helper function to return specific SVG icons for status (Todo, In Progress, Done)
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return <TodoIcon className="status-icon" />;
      case 'in progress':
        return <InProgressIcon className="status-icon" />;
      case 'done':
        return <DoneIcon className="status-icon" />;
      case 'canceled':
        return <CancelledIcon className="status-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        {getColumnIcon()}
        <h2 className="column-title">{title}</h2>
        <span className="ticket-count">{tickets.length}</span>
        <div className="column-actions">
          <button className="add-ticket" onClick={handleAddTicket}>
            <PlusIcon />
          </button>
          <button className="more-options" onClick={handleMoreOptions}>
            <EllipsisIcon />
          </button>
        </div>
      </div>
      <Droppable droppableId={title}>
        {(provided) => (
          <div 
            className="column-content" 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {tickets.map((ticket, index) => (
              <Card 
                key={ticket.id} 
                ticket={ticket} 
                index={index}
                grouping={grouping}
                userAvatar={userAvatars[ticket.userId]}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
