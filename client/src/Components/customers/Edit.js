import React from 'react';
import FormCustomer from './Form';
import {startUpdateCustomer} from '../../actions/customerAction';
import { connect } from 'react-redux';

function EditCustomer(props) {
  const handleSubmit = (formData) => {
    const id = props.match.params.id;
    const redirect = () => props.history.push('/customers');
    props.dispatch(startUpdateCustomer(formData, id, redirect));
  };

  return (
    <div>
      <h2 className='text-center'> Update Customer</h2>
      <FormCustomer handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(EditCustomer);
