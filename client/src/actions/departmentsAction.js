import axios from '../config/axios';
import { updateEmployeeDepartment } from '../actions/employeesAction';
import Swal from 'sweetalert2';

export const setDepartments = (departments) => {
  return {
    type: 'SET_DEPARTMENTS',
    payload: departments,
  };
};

export const startSetDepartments = () => {
  return (dispatch) => {
    axios
      .get('/departments', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const departments = response.data;
        //console.log('departments', departments);
        dispatch(setDepartments(departments));
      });
  };
};

export const removeDepartment = (id) => {
  return {
    type: 'REMOVE_DEPARTMENT',
    payload: id,
  };
};
export const startRemoveDepartment = (id, redirect) => {
  return (dispatch) => {
    axios
      .delete(`/departments/${id}`, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const department = response.data;
        dispatch(removeDepartment(department._id));
        redirect();
      });
  };
};

export const addDepartment = (dept) => {
  return {
    type: 'ADD_DEPARTMENT',
    payload: dept,
  };
};
export const startAddDepartment = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post('/departments', formData, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
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
          });
        } else if (response.data.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Department is already exists`,
            confirmButtonText: 'Ok',
          });
        } else {
          const dept = response.data;
          dispatch(addDepartment(dept));
          redirect();
        }
      });
  };
};

export const updateDepartment = (dept) => {
  return {
    type: 'UPDATE_DEPARTMENT',
    payload: dept,
  };
};
export const startUpdateDepartment = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/departments/${id}`, formData, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
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
          });
        } else if (response.data.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Department is already exists`,
            confirmButtonText: 'Ok',
          });
        } else {
          const dept = response.data;
          dispatch(updateDepartment(dept));
          redirect();
          dispatch(updateEmployeeDepartment(dept));
        }
      });
  };
};
