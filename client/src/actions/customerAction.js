import axios from '../config/axios';
import Swal from 'sweetalert2'

export const setCustomer = (customer) => {
  return {
    type: 'SET_CUSTOMER',
    payload: customer,
  };
};

 export const startSetCustomer = () => {
  return (dispatch) => {
    axios
      .get('/customers', {
        headers: {
          'x-auth': localStorage.getItem('authToken'),
        },
      })
      .then((response) => {
        const customer = response.data;
        // console.log('cust', customer);
        dispatch(setCustomer(customer));
      });
  };
};


export const addCustomer = (customer)=>{
  return { type: 'ADD_CUSTOMER', payload: customer}
}
export const startAddCustomer = (formData, redirect) =>{
  return (dispatch) =>{
    axios.post('/customers', formData, {
      headers:{
        'x-auth': localStorage.getItem('authToken')
      }
    })
    .then((response) =>{
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
         confirmButtonText: 'Ok'
       });
     } 
     else if(response.data.name === 'MongoError'){
       Swal.fire({
         icon:'error',
         title: 'Oops...',
         text: `name / email are already exists`,
         confirmButtonText: 'Ok'
       })
     }
     else {
       const customer = response.data;
       dispatch(addCustomer(customer));
       redirect();
     }
    })
  }
}


export const removeCustomer = (id) =>{
  return {
    type:'REMOVE_CUSTOMER', payload: id
  }
}
export const startRemoveCustomer =(id)=>{
  return(dispatch) =>{
    axios.delete(`/customers/${id}`, {
      headers:{
        'x-auth': localStorage.getItem('authToken')
      }
    })
    .then((response) =>{
      const customer = response.data
      dispatch(removeCustomer(customer._id))
    })
  }
}

export const updateCustomer = (customer)=>{
  return {type:'UPDATE_CUSTOMER', payload: customer}
}
export const startUpdateCustomer = (formData, id, redirect)=>{
  return (dispatch) =>{
    axios.put(`/customers/${id}`, formData, {
      headers:{
        'x-auth': localStorage.getItem('authToken')
      }
    })
    .then((response)=>{
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
          text: `name / email are already exists`,
          confirmButtonText: 'Ok',
        });
      } else {
        const customer = response.data;
        dispatch(updateCustomer(customer));
        redirect();
      }
    })
  }
}


