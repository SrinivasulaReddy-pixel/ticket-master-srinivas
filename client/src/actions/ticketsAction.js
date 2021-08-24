import axios from '../config/axios'

import swal from 'sweetalert2';

export const setTickets = (ticket) => {
  return {
    type: 'SET_TICKETS',
    payload: ticket,
  };
};

export const startSetTickets = () => {
  return (dispatch) => {
    axios
      .get('/tickets', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        console.log("set tic",response)
        const tickets = response.data;
        console.log("set tickets", tickets)
        dispatch(setTickets(tickets));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeTicket = (ticket) => {
  return {
    type: 'REMOVE_TICKET',
    payload: ticket,
  };
};

export const startRemoveTicket = (id, redirect) => {
  return (dispatch) => {
    axios
      .delete(`/tickets/${id}`, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const ticket = response.data;
        dispatch(removeTicket(ticket));
        redirect()
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addTicket = (ticket) => {
  return {
    type: 'ADD_TICKET',
    payload: ticket,
  };
};

export const startAddTicket = (ticket, redirect) => {
  return (dispatch) => {
    axios
      .post('/tickets', ticket, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const ticket = response.data;
        console.log('add ticket', ticket)
        dispatch(addTicket(ticket));
        redirect();
      });
  };
};

export const editTicket = (ticket) => {
  return {
    type: 'EDIT_TICKET',
    payload: ticket,
  };
};

export const startEditTicket = (ticket, redirect) => {
  return (dispatch) => {
    axios
      .put(`/tickets/${ticket.id}`, ticket, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.errors) {
          swal(`${response.data.message}`, '', 'error');
        } else {
          const ticket = response.data;
          redirect();
          dispatch(editTicket(ticket));
        }
      });
  };
};

export const toggleTask = (ticket) => {
  return {
    type: 'TOGGLE_TASK',
    payload: ticket,
  };
};

export const startToggleTask = (id, isResolved) => {
  return (dispatch) => {
    axios.put(
      `/tickets/${id}`,
      { isResolved: !isResolved },
      {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      }
    );
    dispatch(toggleTask(id));
  };
};

export const searchTicket = (search) => {
  return {
    type: 'SEARCH_TICKET',
    payload: search,
  };
};

export const updateTicketCustomer = (customer) => {
  return {
    type: 'UPDATE_TICKET_CUSTOMER',
    payload: customer,
  };
};

export const updateTicketDepartment = (department) => {
  return {
    type: 'UPDATE_TICKET_DEPARTMENT',
    payload: department,
  };
};
// export const updateTicketEmployee = (employee) => {
//     return {
//         type: 'UPDATE_TICKET_EMPLOYEE',
//         payload: employee
//     }
// }
