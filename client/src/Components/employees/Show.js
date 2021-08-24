import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { findEmployee } from '../../selectors/findEmployee';

function EmployeesShow(props) {
  const { _id, name, email, mobile } = props.employee || {};
  return (
    <div className="container col-md-6 mt-5">
      {props.employee ? (
        <div className="card text-center" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5>Employee Details</h5>
            <p className="card-text">Name-{name}</p>
            <p className="card-text">Email-{email}</p>
            <p className="card-text">Mobile-{mobile}</p>
            <Link to={`/employees/edit/${_id}`}>
              <button type="button" className="btn btn-primary m-3 btn-sm">
                Edit
              </button>
            </Link>
            <Link to="/employees">
              <button type="button" className="btn btn-primary btn-sm">
                Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>loading..</p>
        </div>
      )}
    </div>
    // <div>
    //   <h2>Employee-{name} -{email}</h2>
    //   <Link to={`/employees/edit/${_id}`}>edit</Link> <br />
    //   <Link to="/employees">back</Link>
    // </div>
  );
}
const mapStateToProps = (state, props) => {
  console.log(props);
  const id = props.match.params.id;
  return {
    employee: findEmployee(state.employees, id),
  };
};
export default connect(mapStateToProps)(EmployeesShow);
