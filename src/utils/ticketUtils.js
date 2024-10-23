export const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
      return acc;
    }, {});
  };
  
  export const groupByUser = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
      return acc;
    }, {});
  };
  
  export const groupByPriority = (tickets) => {
    const priorityLabels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return tickets.reduce((acc, ticket) => {
      const priorityLabel = priorityLabels[ticket.priority];
      (acc[priorityLabel] = acc[priorityLabel] || []).push(ticket);
      return acc;
    }, {});
  };
  
  export const sortByPriority = (tickets) => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };
  
  export const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

export const groupTickets = (tickets, grouping, users) => {
  switch (grouping) {
    case 'status':
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    case 'user':
      return tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        (acc[userName] = acc[userName] || []).push(ticket);
        return acc;
      }, {});
    case 'priority':
      const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      return tickets.reduce((acc, ticket) => {
        const priorityName = priorityNames[ticket.priority];
        (acc[priorityName] = acc[priorityName] || []).push(ticket);
        return acc;
      }, {});
    default:
      return { 'All Tickets': tickets };
  }
};

export const sortTickets = (groupedTickets, sorting) => {
  const sortFunction = sorting === 'priority' 
    ? (a, b) => b.priority - a.priority
    : (a, b) => a.title.localeCompare(b.title);

  return Object.entries(groupedTickets).reduce((acc, [key, tickets]) => {
    acc[key] = tickets.sort(sortFunction);
    return acc;
  }, {});
};
