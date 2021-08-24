import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {startSetTickets, startRemoveTicket,
} from '../../actions/tickets1Action';
import Swal from 'sweetalert2';
import PendingTicket from './PendingTicket';
import CompletedTicket from './CompletedTicket';
import { Progress } from 'reactstrap';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { startSetCustomer } from '../../actions/customerAction';
import { startSetDepartments } from '../../actions/departmentsAction';
import { startSetEmployees } from '../../actions/employeesAction';

class TicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      complete: false,
    };
  }
  handlePending = () => {
    this.setState({
      pending: true,
      complete: false,
    });
  };
  handleComplete = () => {
    this.setState({
      pending: false,
      complete: true,
    });
  };


  render() {
    if (this.props.tickets.length == 0) {
      this.props.dispatch(startSetCustomer());
      this.props.dispatch(startSetDepartments());
      this.props.dispatch(startSetEmployees());
      this.props.dispatch(startSetTickets());
    }

    return (
      <div className="container mt-5">
        {this.props ? (
          <div>
            <h2>Listing Tickets-{this.props.tickets.length}</h2>
            <nav className=" navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <button className="nav-link" onClick={this.handlePending}>
                      Pending
                      <span className="sr-only">(current)</span>
                    </button>
                  </li>
                  <li className="nav-item active">
                    <button className="nav-link" onClick={this.handleComplete}>
                      Completed
                    </button>
                  </li>
                </ul>
              </div>
            </nav>

            {this.state.pending && <PendingTicket />}
            {this.state.complete && <CompletedTicket />}
            <Link to="/tickets/new">
              <button className="btn btn-primary btn-sm">Add Ticket</button>
            </Link>

            {/* progressbar */}
            <Progress
              animated
              style={{ marginTop: '20px' }}
              value={
                (this.props.tickets.filter((ticket) => ticket.isResolved)
                  .length /
                  this.props.tickets.length) *
                100
              }
            />

            <div className="container">
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
                Data on Pending Tickets
              </h3>
              <div className="row">
                <div className="col-md-6">
                  <PieChart />
                </div>
                <div className="col-md-6" style={{ marginTop: '15px' }}>
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>loading...</p>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(TicketList);
