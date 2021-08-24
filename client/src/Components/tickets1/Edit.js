import React from 'react';
import TicketForm from './Form';
import { connect } from 'react-redux';
import { startUpdateTicket } from '../../actions/tickets1Action';

function TicketEdit(props) {
  const handleSubmit = (formData) => {
    const id = props.match.params.id;
    console.log('edit ticket', formData);
    const redirect = () => props.history.push('/tickets');
    props.dispatch(startUpdateTicket(formData, id, redirect));
  }; 
  return (
    <div className="container col-md-5 offset-md-3">
      <h2 className="text-center" style={{ marginTop: '30px' }}>
        Edit Ticket
      </h2>
      <TicketForm handleSubmit={handleSubmit} />
    </div>
  );
}
export default connect()(TicketEdit);
