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
  const priorityMap = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };
  return tickets.reduce((acc, ticket) => {
    const priority = priorityMap[ticket.priority];
    (acc[priority] = acc[priority] || []).push(ticket);
    return acc;
  }, {});
};
