import React from 'react'
import FormCustomer from './Form'
import {startAddCustomer} from '../../actions/customerAction'
import {connect} from 'react-redux'

function AddCustomer(props){
    const handleSubmit = (formData) =>{
        const redirect =()=> props.history.push('/customers')
        props.dispatch(startAddCustomer(formData, redirect))
    }

    return (
        <div>
            <h2 className='text-center'> Add Customer</h2>
            <FormCustomer handleSubmit={handleSubmit} /> 
        </div>
    )
}

export default connect()(AddCustomer)