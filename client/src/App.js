import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import TicketList from './Components/tickets1/List'
import TicketShow from './Components/tickets1/Show'
import TicketNew from './Components/tickets1/Add'
import TicketEdit from './Components/tickets1/Edit'
// import TicketsList from './Components/tickets/List'
// import TicketShow from './Components/tickets/Show'
// import TicketNew from './Components/tickets/Add'
// import TicketEdit from './Components/tickets/Edit'

import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Home from './Components/auth/Home';

import Account from './Components/auth/Account';
import {startLogout} from './actions/userAction';

import CustomerList from './Components/customers/List';
import ShowCustomer from './Components/customers/Show';
import AddCustomer from './Components/customers/Add';
import EditCustomer from './Components/customers/Edit';

import DepartmentsList from './Components/departments/List';
import AddDepartment from './Components/departments/Add';
import DepartmentsShow from './Components/departments/Show';
import DepartmentUpdate from './Components/departments/Edit';

import EmployeesList from './Components/employees/List';
import AddEmployee from './Components/employees/Add';
import EmployeesShow from './Components/employees/Show';
import EmployeeUpdate from './Components/employees/Edit';

function App(props) {
  console.log('app', props);
  const handleLogout = () => {
    props.dispatch(startLogout());
  };
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar color="light" light expand="md" className="mb-5">
          <Nav className="ml-auto" navbar>
            <NavbarBrand>Ticket Master</NavbarBrand>
            <NavItem>
              <Link className="nav-link text-primary" to="/home">
                Home
              </Link>
            </NavItem>

            {Object.keys(props.user).length === 0 ? (
              <React.Fragment>
                <NavItem>
                  <Link className="nav-link text-primary" to="/users/login">
                    Login
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/users/register">
                    Register
                  </Link>
                </NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem>
                  <Link className="nav-link text-primary" to="/customers">
                    {' '}
                    Customers{' '}
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/users/account">
                    {' '}
                    Account{' '}
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/departments">
                    Departments
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/employees">
                    Employees
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className='nav-link text-primary' to='/tickets'>Tickets</Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link text-primary"
                    to="#"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Navbar>
        <div className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/users/login" component={Login} />
            <Route path="/users/register" component={Register} />
            <Route path="/users/account" component={Account} />

            <Route path="/customers" component={CustomerList} exact={true} />
            <Route path="/customers/new" component={AddCustomer} />
            <Route path="/customers/edit/:id" component={EditCustomer} />
            <Route path="/customers/:id" component={ShowCustomer} />

            <Route path="/departments"component={DepartmentsList} exact={true} />
            <Route path="/departments/new" component={AddDepartment} />
            <Route path="/departments/edit/:id"  component={DepartmentUpdate}exact={true} />
            <Route path="/departments/:id" component={DepartmentsShow} exact={true} />
        
            <Route path="/employees" component={EmployeesList} exact={true} />
            <Route path="/employees/new" component={AddEmployee} />
            <Route path="/employees/edit/:id" component={EmployeeUpdate} />
            <Route path="/employees/:id" component={EmployeesShow} />

            <Route path='/tickets' component={TicketList} exact={true} />
            <Route path='/tickets/new' component={TicketNew} />
            <Route path='/tickets/edit/:id' component={TicketEdit} />
            <Route path='/tickets/:id' component={TicketShow} /> 
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
