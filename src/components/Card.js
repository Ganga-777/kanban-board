import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Card.css';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

const Card = ({ ticket, index, grouping, userAvatar }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card-header">
            <span className="card-id">{ticket.id}</span>
            {grouping !== 'user' && (
              <img src={userAvatar} alt="User Avatar" className="user-avatar" />
            )}
          </div>
          <h3 className="card-title">{ticket.title}</h3>
          <div className="card-footer">
            {grouping !== 'priority' && (
              <span className="card-priority">
                {priorityLabels[ticket.priority]}
              </span>
            )}
            <span className="card-tag">{ticket.tag}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
