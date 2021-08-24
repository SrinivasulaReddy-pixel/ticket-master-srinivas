import { Box, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findDepartment } from '../../selectors/findDepartment';

class DepartmentsForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: props.department ? props.department.name : ''
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
    };
    console.log('dept',this.props)
    this.props.handleSubmit(formData)
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
          style={{ width: '20rem', height: '17rem' }}
        >
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
               
                  <TextField
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    type="text"
                    value={this.state.name}
                    id="name"
                    name="name"
                    onChange={this.handleChange}
                    className="mb-5 mt-5"
                    label="Department name"
                  />
                
                <div className="d-grid">
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary btn-sm"
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
const mapStateToProps =(state,props)=>{
    const id= props.match.params.id
    return {
        department: findDepartment(state.departments, id)
    }
}

export default withRouter(connect(mapStateToProps)(DepartmentsForm));
