import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  startSetEmployees,
  startRemoveEmployee,
} from '../../actions/employeesAction';
import { MDBDataTableV5 } from 'mdbreact';
import { startSetDepartments } from '../../actions/departmentsAction';

function EmployeesList(props) {
  if (props.employees.length === 0) {
    props.dispatch(startSetEmployees());
    props.dispatch(startSetDepartments());
  }
 
  const handleRemove = (id) => {
    const confirmRemove = window.confirm('Are you sure');
    if (confirmRemove) {
      const redirect = () => {
        props.history.push('/employees');
      };
      props.dispatch(startRemoveEmployee(id, redirect));
    }
  };
  const findDepartment = (id) => {
    //console.log('find department',props.departments.find(dept => dept._id === id))
    return props.departments.find((dept) => dept._id === id);
  };
  const data = {
    columns: [
      {
        label: 'Sl.No',
        field: 'slno',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Mobile',
        field: 'mobile',
      },
      {
        label: 'Department',
        field: 'department',
      },
      {
        label: 'Actions',
        field: 'actions',
      },
    ],
    rows: props.employees.map((emp, i) => ({
      slno: i + 1,
      name: emp.name,
      email: emp.email,
      mobile: emp.mobile,
      department: findDepartment(emp.department)?.name,
      actions: (
        <div>
          <Link to={`/employees/${emp._id}`}
            className="btn btn-secondary btn-sm"
          >
            show
          </Link>
          <button
            onClick={() => {
              handleRemove(emp._id);
            }}
            className="btn btn-danger btn-sm"
          >
            remove
          </button>
        </div>
      ),
    })),
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h2> Employees List-{props.employees.length}</h2>
        <MDBDataTableV5
          data={data}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          searchTop
          searchBottom={false}
        />
        <Link to="/employees/new" className='btn btn-primary btn-sm'> Add Eployee </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    departments: state.departments,
  };
};
export default connect(mapStateToProps)(EmployeesList);
