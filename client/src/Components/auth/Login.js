import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/userAction';
import { Grid, Box, TextField } from '@material-ui/core';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
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
      email: this.state.email, 
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push('/users/home');
    };
    this.props.dispatch(startLogin(formData, redirect));
  };
   
  render() {
    const {classes} = this.props
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
          style={{ width: '25rem', height: '25rem' }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="mb-5">
                <h2 className="text-center">Sign in</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-5">
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
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                    label="Email"
                  />
                </div>
                <div className="mb-5">
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
                <div className="d-grid mb-3">
                  <input
                    type="submit"
                    value="login"
                    className="btn btn-primary"
                  />
                </div>
                <p className="text-center"> or </p>
                <p className="text-center">
                  <Link to="/users/register">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </Box>
      </Grid>
    );
  }
}

export default connect()(Login);
