import React from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { findDepartment } from '../../selectors/findDepartment';
import { pendingTicket } from '../../selectors/ticketSelector';

function BarChart(props) {
  //console.log('pending', props.pendingTicket);
  const it = props.pendingTicket.filter(
    (ticket) => findDepartment(props.departments, ticket.department)?.name === 'IT'
  ).length;
  const finance = props.pendingTicket.filter(
    (ticket) => findDepartment(props.departments, ticket.department)?.name === 'Finance'
  ).length;
  const maths = props.pendingTicket.filter(
    (ticket) => findDepartment(props.departments, ticket.department)?.name === 'Maths'
  ).length;
  console.log('length', it, finance, maths);
  return (
    <div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Departments', 'Tickets'],
          ['IT', it],
          ['Finance', finance],
          ['Maths', maths],
        ]}
        options={{
          chart: {
            title: 'Tickets By Department',
          },
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
    departments: state.departments
  };
};
export default connect(mapStateToProps)(BarChart);
