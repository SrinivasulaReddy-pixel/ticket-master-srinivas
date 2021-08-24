import React from 'react';
import { connect } from 'react-redux';
import {startRegister} from '../../actions/userAction';
import {Grid, Box, TextField} from '@material-ui/core'

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push('/users/login');
    };
    this.props.dispatch(startRegister(formData, redirect));
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
          m={2} p={2} px={5}    
          style={{ width: '25rem', height: '25rem' }}
        >
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-5">
                  <h2 className="text-center">Create Account</h2>
                </div>
                <div className="mb-4">
                  {/* <label htmlFor="username" className="form-label">
                    username
                  </label> */}
                  <TextField
                    variant="outlined"
                    size="small"
                    required
                    type="text"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    className="form-control"
                    label="Username"
                  />
                </div>
                <div className="mb-4">
                  {/* <label htmlFor="email" className="form-label">
                    email
                  </label> */}
                  <TextField
                    variant="outlined"
                    size="small"
                    required
                    type="text"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="form-control"
                    label="Email"
                  />
                </div>
                <div className="mb-5">
                  {/* <label htmlFor="password" className="form-label">
                    password
                  </label> */}
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className="form-control"
                    label="Password"
                  />
                </div>
                <div className="d-grid ">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn btn-primary"
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

export default connect()(Register);



// <Grid container>
//       <Box
//         boxShadow={0}
//         bgcolor="background.paper"
//         m={1}
//         p={1}
//         style={{ width: '8rem', height: '5rem' }}
//       >
//         boxShadow={3}
//       </Box>
//       </Grid>