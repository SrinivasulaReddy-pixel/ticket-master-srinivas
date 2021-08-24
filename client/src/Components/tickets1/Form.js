import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { findTicket } from '../../selectors/ticketSelector';
import { Box, Grid } from '@material-ui/core';

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.ticket ? props.ticket.code : '',
      customer: props.ticket ? props.ticket.customer : '',
      department: props.ticket ? props.ticket.department : '',
      employeesNewList: [],
      tempEmployee: [],
      employee: props.ticket ? props.ticket.employees : [],
      message: props.ticket ? props.ticket.message : '',
      priority: props.ticket ? props.ticket.priority : '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employees: this.state.employee,
      message: this.state.message,
      priority: this.state.priority,
    };
    console.log('formData', formData);
    this.props.ticket && (formData.id = this.props.ticket._id);
    this.props.handleSubmit(formData);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    let tempEmployee = [];
    {
      this.props.employees.map((employee) => {
        return tempEmployee.push({
          value: employee.name,
          _id: employee._id,
          name: employee.name,
          label: employee.name,
          deptId: employee.department,
        });
      });
      this.setState({ tempEmployee });
    }
    if (e.target.name === 'department') {
      this.setState({
        employeesNewList: this.state.tempEmployee.filter(
          (employee) => employee.deptId === e.target.value
        ),
      });
      console.log('employeeNewList', this.state.employeesNewList);
    }
  };

  handleMultiChange = (option) => {
    this.setState(() => {
      return {
        employee: option,
      };
    });
  };

  render() {
    console.log('empl sele', this.state.employee);
    console.log('list', this.state.employeesNewList)
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={2}
          p={2}
          px={5}
          style={{ width: '30rem', height: '28rem' }}
        >
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-4 mt-2">
                  {/* <label htmlFor="code">Code</label> */}
                  <input
                    type="text"
                    name="code"
                    value={this.state.code}
                    onChange={this.handleChange}
                    id="code"
                    className="form-control"
                    placeholder="Code *"
                  />
                </div>
                <div className="mb-4">
                  <select
                    id="customer"
                    value={this.state.customer}
                    onChange={this.handleChange}
                    name="customer"
                    className="form-control"
                  >
                    <option value="">Select customer *</option>
                    {this.props.customers.map((customer) => {
                      return (
                        <option key={customer._id} value={customer._id}>
                          {customer.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    id="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                    name="department"
                    className="form-control"
                  >
                    <option value="">Select department *</option>
                    {this.props.departments.map((department) => {
                      return (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-4">
                  <Select
                    id="employees"
                    name="employees"
                    placeholder="Select employees"
                    options={this.state.employeesNewList}
                    onChange={this.handleMultiChange}
                    isMulti
                    value={this.state.employee}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    value={this.state.message}
                    onChange={this.handleChange}
                    name="message"
                    className="form-control"
                    placeholder="Message *"
                  ></textarea>
                </div>
                <div className="form-group ">
                  <label htmlFor="priority">Priority</label>
                  <div className="form-check form-check-inline pl-3">
                    <input
                      type="radio"
                      checked={this.state.priority === 'high'}
                      value="high"
                      name="priority"
                      onChange={this.handleChange}
                      className="form-check-input "
                    />
                    <label className="form-check-label">High</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      checked={this.state.priority === 'medium'}
                      name="priority"
                      value="medium"
                      onChange={this.handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Medium</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      checked={this.state.priority === 'low'}
                      name="priority"
                      value="low"
                      onChange={this.handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Low</label>
                  </div>
                </div>
                <div className="d-grid">
                  <input
                    type="submit"
                    className="btn btn-primary btn-sm m-3"
                    value="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Grid>
    );
  }
}
const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
    ticket: findTicket(state.tickets, id),
  };
};
export default withRouter(connect(mapStateToProps)(TicketForm));
