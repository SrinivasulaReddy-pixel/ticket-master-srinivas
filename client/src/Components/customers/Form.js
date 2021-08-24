import { Box, Grid, TextField } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { findCustomer } from '../../selectors/findCustomer'

class FormCustomer extends React.Component{
    constructor(props){
        super(props)
        console.log('props',props)
        this.state = {
            name: props.customer? props.customer.name : '',
            email: props.customer? props.customer.email : '',
            mobile: props.customer? props.customer.mobile : ''
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
       this.props.handleSubmit(formData)
    }

    render(){
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
              style={{ width: '25rem', height: '20rem' }}
            >
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={this.handleSubmit}>
                   
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="mb-4 mt-4"
                        label="Name"
                      />
                   
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="mb-4"
                        label="Email"
                      />
                   
                      <TextField
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={this.state.mobile}
                        onChange={this.handleChange}
                        className="mb-4"
                        label="Mobile"
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
const mapStateToProps = (state, props) =>{
  console.log('form', props)
    const id = props.match.params.id
    return {
        customer: findCustomer(state.customers, id)
    }
}

export default withRouter(connect(mapStateToProps)(FormCustomer))