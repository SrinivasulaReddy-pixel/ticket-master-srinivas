import axios from '../config/axios';
import Swal from 'sweetalert2';

export const setEmployees = (employees) => {
  return {
    type: 'SET_EMPLOYEES',
    payload: employees,
  };
};

export const startSetEmployees = () => {
  return (dispatch) => {
    axios
      .get('/employees', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const employees = response.data;
        //console.log('set employees', employees);
        dispatch(setEmployees(employees));
      });
  };
};

export const removeEmployee = (id) => {
  return {
    type: 'REMOVE_EMPLOYEE',
    payload: id,
  };
};
export const startRemoveEmployee = (id, redirect) => {
  return (dispatch) => {
    axios
      .delete(`/employees/${id}`, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const employee = response.data;
        //console.log("removed employee",employee)
        dispatch(removeEmployee(employee._id));
        redirect();
      });
  };
};

export const addEmployee = (emp) => {
  return {
    type: 'ADD_EMPLOYEE',
    payload: emp,
  };
};
export const startAddEmployee = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post('/employees', formData, {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty('errors')) {
          //console.log("added employees",response.data);
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
            text: `name / email are already exists`,
            confirmButtonText: 'Ok',
          });
        } else {
          const emp = response.data;
          // console.log("employee", emp)
          dispatch(addEmployee(emp));
          redirect();
        }
      });
  };
};

export const updateEmployee = (dept) => {
  return {
    type: 'UPDATE_EMPLOYEE',
    payload: dept,
  };
};
export const startUpdateEmployee = (employee, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/employees/${id}`, employee, {
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
        } else if (response.data.name === 'CastError' ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.message}`,
            confirmButtonText: 'Ok',
          });
        } else if (response.data.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `name / email are already exists`,
            confirmButtonText: 'Ok',
          });
        } else {
          const emp = response.data;
          console.log('updated employee', emp);
          dispatch(updateEmployee(emp));
          redirect();
        }
      });
  };
};

export const updateEmployeeDepartment = (department) => {
  return {
    type: 'UPDATE_EMPLOYEE_DEPARTMENT',
    payload: department,
  };
};
