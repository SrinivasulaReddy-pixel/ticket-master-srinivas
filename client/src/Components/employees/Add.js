import React from 'react';
import { connect } from 'react-redux';
import { startAddEmployee } from '../../actions/employeesAction';
import EmployeesForm from '../../Components/employees/Form';

function AddEmployee(props) {
  const handle = (formData) => {
    const redirect = () => {
      props.history.push('/employees');
    };
    return props.dispatch(startAddEmployee(formData, redirect));
  };
  return (
    <div>
      <h2 className="text-center">Add Employee</h2>
      <EmployeesForm handleSubmit={handle} />
    </div>
  );
}

export default connect()(AddEmployee);
