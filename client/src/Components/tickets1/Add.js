import React from 'react';
import TicketForm from './Form';
import { connect } from 'react-redux';
import { startAddTicket } from '../../actions/tickets1Action';

function TicketNew(props) {
  const handleSubmit = (formData) => {
    console.log('formdata new', formData);
    const redirect = () => props.history.push('/tickets');
    props.dispatch(startAddTicket(formData, redirect));
  };
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center" style={{ marginTop: '3px' }}>
          Add Ticket
        </h2>
        <TicketForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
export default connect()(TicketNew);
