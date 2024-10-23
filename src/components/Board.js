import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import useTickets from '../hooks/useTickets';
import { groupByStatus, groupByUser, groupByPriority, sortByPriority, sortByTitle } from '../utils/ticketUtils';
import Column from './Column';
import DisplayOptions from './DisplayOptions';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/Board.css';

// Import avatar images
import avatar1 from '../assets/icons_FEtask/avatar1.jpg';
import avatar2 from '../assets/icons_FEtask/avatar2.jpg';
import avatar3 from '../assets/icons_FEtask/avatar3.jpg';
import avatar4 from '../assets/icons_FEtask/avatar4.jpg';
import avatar5 from '../assets/icons_FEtask/avatar5.png';


// Define userAvatars object
const userAvatars = {
  'usr-1': avatar1,
  'usr-2': avatar2,
  'usr-3': avatar3,
  'usr-4': avatar4,
  'usr-5': avatar5
};

const statuses = ["Todo", "In Progress", "Done", "Canceled"];

const Board = () => {
  const { tickets, loading, error } = useTickets();
  const [groupedTickets, setGroupedTickets] = useState({});
  const [grouping, setGrouping] = useLocalStorage('grouping', 'status');
  const [sorting, setSorting] = useLocalStorage('sorting', 'priority');

  useEffect(() => {
    if (tickets.length) {
      let grouped;
      switch (grouping) {
        case 'user':
          grouped = groupByUser(tickets);
          break;
        case 'priority':
          grouped = groupByPriority(tickets);
          break;
        default:
          grouped = groupByStatus(tickets);
      }

      // Apply sorting to each group
      Object.keys(grouped).forEach(key => {
        grouped[key] = sorting === 'priority' 
          ? sortByPriority(grouped[key]) 
          : sortByTitle(grouped[key]);
      });

      setGroupedTickets(grouped);
    }
  }, [tickets, grouping, sorting]);

  const onDragEnd = (result) => {
    // Implement drag and drop logic here
    console.log('Drag ended:', result);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="board">
      <DisplayOptions 
        grouping={grouping} 
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(groupedTickets).map(([key, tickets]) => (
            <Column 
              key={key} 
              title={key} 
              tickets={tickets} 
              grouping={grouping}
              userAvatars={userAvatars}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
