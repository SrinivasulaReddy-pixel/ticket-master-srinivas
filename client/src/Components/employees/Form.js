import { Box, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, FormGroup, Input,Label} from 'reactstrap';
import { findEmployee } from '../../selectors/findEmployee';

class EmployeesForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: props.employee ? props.employee.name : '',
      email: props.employee ? props.employee.email: '',
      mobile: props.employee ? props.employee.mobile: '',
      department: props.employee ? props.employee.department: ''
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email:this.state.email,
      mobile: this.state.mobile,
      department: this.state.department
    };
    this.props.employee && (formData.id = this.props.employee._id);
    console.log('emp', this.props);
    this.props.handleSubmit(formData);
  };
  render() {
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
          style={{ width: '30rem', height: '25rem' }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form onSubmit={this.handleSubmit}>
               
                  {/* <Label htmlFor="name" className="form-label">
                    Name
                  </Label> */}
                  <TextField
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    type="text"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                    label="Name"
                    className="mb-4 mt-4"
                  />
               <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  type="text"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                  label="Email"
                  className="mb-4"
                />

                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  type="text"
                  id="mobile"
                  value={this.state.mobile}
                  onChange={this.handleChange}
                  name="mobile"
                  label="Mobile"
                  className="mb-4"
                />

                <FormGroup className="mb-4">
                  <Input
                    type="select"
                    id="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                    name="department"
                  >
                    <option value="">select</option>
                    {this.props.departments.map((department) => {
                      return (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <div className="d-grid">
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary"
                  />
                </div>
              </Form>
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
    employee: findEmployee(state.employees, id),
    departments: state.departments
  };
};

export default withRouter(connect(mapStateToProps)(EmployeesForm));
