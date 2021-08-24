import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { findDepartment } from '../../selectors/findDepartment'

function DepartmentsShow(props){
    const {_id, name} = props.department || {}
    return (
      <div className="container col-md-6 mt-5">
        {props.department ? (
          <div className="card text-center" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title"> Department Details  </h5>
              <p className="card-text">{props.department.name}</p>
              <Link to={`/departments/edit/${props.department._id}`}>
                <button type="button" className="btn btn-primary m-3 btn-sm">
                  Edit
                </button>
              </Link>
              <Link to="/departments">
                <button type="button" className="btn btn-primary btn-sm">
                  Back
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p>loading...</p>
          </div>
        )}
      </div>
      // <div>
      //     <h2>Department-{name} </h2>
      //     <Link to={`/departments/edit/${_id}`}>Edit</Link> <br/>
      //     <Link to='/departments'>back</Link>
      // </div>
    );
}
const mapStateToProps = (state, props)=>{
    console.log(props)
    const id = props.match.params.id
    return {
      department: findDepartment(state.departments, id),
    };
}
export default connect(mapStateToProps)(DepartmentsShow)