import axios from '../config/axios';
import Swal from 'sweetalert2'

export const startSetTickets = () => {
  return (dispatch) => {
    axios
      .get('/tickets', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const tickets = response.data;
        console.log('set tickets', tickets);
        dispatch(setTickets(tickets));
      });
  };
};
export const setTickets = (tickets) => {
  return {
    type: 'SET_TICKETS',
    payload: tickets,
  };
};
//async
export const startAddTicket = (formData, redirect) => {
  console.log('formdta', formData);
  return (dispatch) => {
    axios
      .post('/tickets', formData, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty('errors')) {
          const errorMessages = [];
          for (const key in response.data.errors) {
            errorMessages.push(response.data.errors[key].message);
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorMessages.join(', ')}`,
            confirmButtonText: 'Ok',
          });
        } else if (response.data.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `code is already exists`,
            confirmButtonText: 'Ok',
          });
        } else {
          const ticket = response.data;
          // console.log("add ticket", emp)
          dispatch(addTicket(ticket));
          redirect();
        }
      });
  };
};
export const addTicket = (ticket) => {
  return {
    type: 'ADD_TICKET',
    payload: ticket,
  };
};

export const removeTicket = (id) => {
  return {
    type: 'REMOVE_TICKET',
    payload: id,
  };
};
export const startRemoveTicket = (id) => {
  return (dispatch) => {
    axios
      .delete(`/tickets/${id}`, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const ticket = response.data;
        dispatch(removeTicket(ticket._id));
      });
  };
};
export const startUpdateTicket = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/tickets/${id}`, formData, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty('errors')) {
          console.log(response.data);
          const errorMessages = [];
          for (const key in response.data.errors) {
            errorMessages.push(response.data.errors[key].message);
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorMessages.join(', ')}`,
            confirmButtonText: 'Ok',
          });
        } else if (response.data.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `code is already exists`,
            confirmButtonText: 'Ok',
          });
        } else if (response.data.name === 'CastError' || response.data.employees.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `kindly fill the required data`,
            confirmButtonText: 'Ok',
          });
        } else {
          const ticket = response.data;
          console.log('updated ticket', ticket);
          dispatch(updateTicket(ticket));
          redirect();
        }
      } );
    
  };
};

export const updateTicket = (ticket) => {
  return {
    type: 'UPDATE_TICKET',
    payload: ticket,
  };
};

export const startUpdateStatus = (obj) => {
  console.log('obj', obj);
  return (dispatch) => {
    axios
      .put(`/tickets/${obj.id}`, obj.status, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        console.log('check response', response.data);
        dispatch(updateStatus(response.data));
      });
  };
};
export const updateStatus = (ticket) => {
  return { type: 'UPDATE_STATUS', payload: ticket };
};
