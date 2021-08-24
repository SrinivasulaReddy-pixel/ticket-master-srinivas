import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { startSetDepartments, startRemoveDepartment } from '../../actions/departmentsAction';
import { MDBDataTableV5 } from 'mdbreact'

function DepartmentsList(props) {
  if (props.departments.length === 0) {
    props.dispatch(startSetDepartments());
  }
  const handleRemove = (id)=>{
    const confirmRemove = window.confirm('Are you sure')
    if(confirmRemove){
      const redirect=()=>{props.history.push('/departments')}
      props.dispatch(startRemoveDepartment(id, redirect))
    }
  }

  const data = {
    columns: [
      {
        label:'Sl.No',
        field:'slno'
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Actions',
        field: 'actions',
      },
    ],
    rows: props.departments.map((dept, i) => ({
      slno: i+1,
      name: dept.name,
      actions: (
        <div>
          <Link to={`/departments/${dept._id}`} className='btn btn-secondary btn-sm'> show </Link>
          <button className='btn btn-danger btn-sm'
            onClick={() => {
              handleRemove(dept._id);
            }}
          >   remove
          </button>
        </div>
      ),
    })),
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <h2> Departments List-{props.departments.length}</h2>
        <MDBDataTableV5
          data={data}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          searchTop
          searchBottom={false}
        />
        <Link to="/departments/new" className="btn btn-primary btn-sm"> Add Department </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    departments: state.departments,
  };
};
export default connect(mapStateToProps)(DepartmentsList);
