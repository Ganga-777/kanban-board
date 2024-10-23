import { useState, useEffect } from 'react';

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const updateTicket = (updatedTicket) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
    
  };

  return { tickets, loading, error, updateTicket };
};

export default useTickets;
