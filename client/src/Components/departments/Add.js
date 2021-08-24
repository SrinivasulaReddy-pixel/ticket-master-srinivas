import React from 'react';
import {connect} from 'react-redux'
import { startAddDepartment } from '../../actions/departmentsAction';
import DepartmentsForm from '../../Components/departments/Form';

function AddDepartment(props) {
    const handle =(formData)=>{
        const redirect = ()=> {props.history.push('/departments')}
        return props.dispatch(startAddDepartment(formData, redirect))
    }
  return (
    <div>
      <h2 className='text-center'>Add Department</h2>
      <DepartmentsForm handleSubmit={handle} />
    </div>
  );
}

export default connect()(AddDepartment);
