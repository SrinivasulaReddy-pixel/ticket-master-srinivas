import React from 'react';
import { connect } from 'react-redux';
import EmployeesForm from './Form';
import { startUpdateEmployee } from '../../actions/employeesAction';

function EmployeeUpdate(props) {
  const handle = (employee) => {
    const id = props.match.params.id;
    const redirect = () => {
      props.history.push('/employees');
    };
    props.dispatch(startUpdateEmployee(employee,id, redirect));
  };
  return (
    <div>
      <h2 className="text-center"> Edit Employee</h2>
      <EmployeesForm handleSubmit={handle} />
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    employee: state.employees.find((employee) => employee._id === id),
  };
};

export default connect(mapStateToProps)(EmployeeUpdate);
