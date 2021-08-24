import React from 'react';
import {
  startRemoveTicket,
  startSetTickets,
  startUpdateStatus,
} from '../../actions/tickets1Action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { findCustomer } from '../../selectors/findCustomer';
import { findDepartment } from '../../selectors/findDepartment';
import { findEmployee } from '../../selectors/findEmployee';

function PendingTicket(props) {
  const handleChange = (id) => {
    const status = {
      isResolved: true,
    };
    props.dispatch(startUpdateStatus({ id, status }));
  };
  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        props.dispatch(startRemoveTicket(id));
      }
    });
  }; ///Remove completed

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Code No</th>
            <th>Customer</th>
            <th>Department</th>
            <th>Employees</th>
            <th>Message</th>
            <th>Priority</th>
            <th>Actions</th>
            <th>Remove</th>
            <th>complete</th>
          </tr>
        </thead>
        <tbody>
          {props.tickets.map((ticket) => {
            if (!ticket.isResolved) {
              return (
                <tr key={ticket._id}>
                  <td>{ticket.code}</td>
                  {props.customers.length !== 0 && (
                    <td>
                      {findCustomer(props.customers, ticket.customer)?.name}
                    </td>
                  )}
                  {props.departments.length !== 0 && (
                    <td>
                      {
                        findDepartment(props.departments, ticket.department)
                          ?.name
                      }
                    </td>
                  )}

                  {props.employees.length !== 0 && (
                    <td>
                      {ticket.employees.length > 0 &&
                        ticket.employees.map((emp1, i) => {
                          return (
                            <span key={i}>
                              {' '}
                              {findEmployee(props.employees, emp1)?.name}{' '}
                            </span>
                          );
                        })}
                    </td>
                  )}
                  <td>{ticket.message}</td>
                  <td>{ticket.priority}</td>
                  <td>
                    <Link to={`/tickets/${ticket._id}`}>
                      <button className="btn btn-secondary btn-sm">Show</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        handleRemove(ticket._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ticket.isResolved}
                      onChange={() => {
                        handleChange(ticket._id);
                      }}
                      name="isResolved"
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(PendingTicket);
