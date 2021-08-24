import React from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { findDepartment, pendingTicket } from '../../selectors/ticketSelector';

function PieChart(props) {
  console.log('pending', props.pendingTicket);
  const high = props.pendingTicket.filter(
    (ticket) => ticket.priority === 'high'
  ).length;
  const medium = props.pendingTicket.filter(
    (ticket) => ticket.priority === 'medium'
  ).length;
  const low = props.pendingTicket.filter(
    (ticket) => ticket.priority === 'low'
  ).length;
 console.log('length', high, medium, low);
  return (
    <div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Task', 'Hours per Day'],
          ['High', high],
          ['Medium', medium],
          ['Low', low],
        ]}
        options={{
          title: 'Ticket Priority',
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ticket: state.tickets,
    pendingTicket: pendingTicket(state.tickets),
  };
};
export default connect(mapStateToProps)(PieChart);
