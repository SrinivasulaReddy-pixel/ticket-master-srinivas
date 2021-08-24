import React from 'react';
import { connect } from 'react-redux';
import { findTicket } from '../../selectors/ticketSelector';
import { Link } from 'react-router-dom';
import { findCustomer } from '../../selectors/findCustomer';
import { findDepartment } from '../../selectors/findDepartment';
import { findEmployee } from '../../selectors/findEmployee';

function TicketShow(props) {
  const { _id, code, customer, department, employees, message, priority } =
    props.ticket || {};

  return (
    <div className="container col-md-6 mt-5">
      {props.ticket ? (
        <div className="card text-center" style={{ width: '18rem' }}>
          <div className="card-body">
            <p className="card-text">Code - {code}</p>
            <p className="card-text">
              Customer -
              {props.customers.length !== 0 &&
                findCustomer(props.customers, customer)?.name}
            </p>
            <p className="card-text">
              Department -
              {props.departments.length !== 0 &&
                findDepartment(props.departments, department)?.name}
            </p>
            <p className="card-text">
              Employees -
              {props.employees.length !== 0 && 
                  employees.length > 0 &&
                    employees.map((emp1, i) => {
                      return (
                        <span key={i}>
                          {findEmployee(props.employees, emp1)?.name}
                        </span>
                      );
                    } 
              )}
            </p>
            <p className="card-text">Message - {message}</p>
            <p className="card-text">Priority - {priority}</p>
          </div>
          <p>
            <Link to={`/tickets/edit/${_id}`}>
              <button type="button" className="btn btn-primary m-3 btn-sm">
                Edit
              </button>
            </Link>
            <Link to="/tickets">
              <button type="button" className="btn btn-primary btn-sm">
                Back
              </button>
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <p>loading.....</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    ticket: findTicket(state.tickets, id),
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
  };
};
export default connect(mapStateToProps)(TicketShow);
