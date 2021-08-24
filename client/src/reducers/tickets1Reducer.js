const ticketsInitialState = [];
const ticketsReducer = (state = ticketsInitialState, action) => {
  switch (action.type) {
    case 'SET_TICKETS': {
      return [...action.payload];
    }
    case 'UPDATE_STATUS': {
      return state.map((ticket) => {
        if (ticket._id == action.payload._id) {
          return action.payload;
        } else {
          return ticket;
        }
      });
    }
    case 'ADD_TICKET': {
      return [...state, action.payload];
    }
    case 'REMOVE_TICKET': {
      return state.filter((ticket) => ticket._id != action.payload);
    }
    case 'UPDATE_TICKET': {
      return state.map((ticket) => {
        if (ticket._id == action.payload._id) {
          return { ...ticket, ...action.payload };
        } else {
          return { ...ticket };
        }
      });
    }
    default: {
      return [...state];
    }
  }
};
export default ticketsReducer;
