import React from 'react';
import { connect } from 'react-redux';
import { startSetCustomer } from '../../actions/customerAction';
import { startRemoveCustomer } from '../../actions/customerAction';
import { Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact' ;

function CustomerList(props) {
  const handleRemove = (id)=>{
    const confirmRemove = window.confirm('are u sure')
    if(confirmRemove){
      console.log(id)
       props.dispatch(startRemoveCustomer(id))
    }
  }
  if (props.customers.length === 0) {
    props.dispatch(startSetCustomer());
  }

  const data = {
    columns: [
      {
        label:'Sl.No',
        field:'slno'
      }
      ,
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Mobile',
        field: 'mobile',
      },
      {
        label: 'Actions',
        field: 'actions',
      },
    ],
    rows: props.customers.map((customer,i) => ({
      slno: i+1,
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
      actions: (
        <div>
          <Link className='btn btn-secondary btn-sm' to={`/customers/${customer._id}`}>show</Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              handleRemove(customer._id);
            }}
          >
            remove
          </button>
        </div>
      ),
    })),
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Listing Cust-{props.customers.length} </h2>
        <MDBDataTableV5
          data={data}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          searchTop
          
          searchBottom={false}
          
        />
        <Link to="/customers/new" className="btn btn-primary btn-sm"> Add Customer</Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};
export default connect(mapStateToProps)(CustomerList);
