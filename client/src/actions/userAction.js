import axios from '../config/axios';
import Swal from 'sweetalert2';

export const startRegister = (formData, redirect) => {
  return () => {
    axios.post('/users/register', formData).then((response) => {
     // console.log(response.data.error);
      if (response.data.hasOwnProperty('errors')) {
        //console.log(response.data);
        const errorMessages = [];
        for (const key in response.data.errors) {
          errorMessages.push(response.data.errors[key].message);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${errorMessages.join(', ')}`,
          confirmButtonText: 'Ok',
          timer: 1500,
        });
      } else if (response.data.name === 'MongoError') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `User is already exists`,
          confirmButtonText: 'Ok',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: '',
          text: `Successfully signedup`,
          confirmButtonText: 'Ok',
        });
        redirect();
      }
    });
  };
};

export const setUser = (user) => {
  return { type: 'SET_USER', payload: user };
};

export const setStartUser = () => {
  return (dispatch) => {
    axios
      .get('/users/account', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const user = response.data;
        dispatch(setUser(user));
      });
  };
};

export const startLogin = (formData, redirect) => {
  return (dispatch) => {
    axios.post('/users/login', formData).then((response) => {
      if (response.data.hasOwnProperty('errors')) {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.errors}`,
          confirmButtonText: 'Ok',
          timer: 100000,
        });
      } else {
        //console.log('user response', response);
        localStorage.setItem('authToken', response.data.token);
        redirect();
        axios
          .get('/users/account', {
            headers: {
              'x-auth': localStorage.getItem('authToken'),
            },
          })
          .then((response) => {
            const user = response.data;
            dispatch(setUser(user));
            Swal.fire({
              icon: 'success',
              title: '',
              text: `Successfully loggedin`,
              confirmButtonText: 'Ok'
            });
            redirect();
          });
      }
    });
  };
};

export const removeUser = () => {
  return { type: 'REMOVE_USER' };
};

export const startLogout = () => {
  return (dispatch) => {
    axios
      .delete('/users/logout', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        //console.log("logout", response)
        if (response.data.notice) {
          localStorage.removeItem('authToken');
          dispatch(removeUser());
          Swal.fire({
            icon: 'success',
            title: '',
            text: `Successfully logged out`,
            confirmButtonText: 'Ok',
          });
          window.location.href = '/users/logout';
        }
      });
  };
};

