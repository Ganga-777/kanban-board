import React, { useState, useEffect } from 'react';
import useTickets from '../hooks/useTickets';
import { groupByStatus, groupByUser, groupByPriority } from '../utils/groupTickets';
import { sortByPriority, sortByTitle } from '../utils/sortTickets';
import Column from './Column';
import DisplayOptions from './DisplayOptions';
import '../styles/Board.css';

const Board = () => {
  const { tickets, loading, error } = useTickets();
  const [groupedTickets, setGroupedTickets] = useState({});
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

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

      Object.keys(grouped).forEach(key => {
        grouped[key] = sorting === 'priority' ? sortByPriority(grouped[key]) : sortByTitle(grouped[key]);
      });

      setGroupedTickets(grouped);
    }
  }, [tickets, grouping, sorting]);

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
      <div className="columns">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <Column key={key} title={key} tickets={tickets} />
        ))}
      </div>
    </div>
  );
};

export default Board;