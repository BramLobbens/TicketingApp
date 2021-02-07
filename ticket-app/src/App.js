import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import {
  Home,
  TicketPage,
  Tickets,
  CreateTicket,
  Signin,
  Signup,
} from "./pages";
import { Footer } from "./components";

// class User extends Component {
//   state = {
//     user: null,
//   }

//   render() {
//     const { user } = this.state;

//     return (
//       <div>
//         {!user &&
//           <p>not logged in</p>
//         }
//         {user &&
//           <p>logged in</p>
//         }
//       </div>
//     );
//   }
// }

export default function App() {

  const user = localStorage.getItem("userName");

  return (
    <>
      {/* <User/> */}
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href={ROUTES.HOME}>Ticketing App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
              <Nav.Link href={ROUTES.TICKETS}>Tickets</Nav.Link>

              {user
              ?
              <NavDropdown title={user} id="basic-nav-dropdown">
                <NavDropdown.Item href={ROUTES.MY_TICKETS}>
                  My tickets
                </NavDropdown.Item>
                <NavDropdown.Item href={ROUTES.CREATE_TICKET}>
                  Create ticket
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
              :
              <>
                <Nav.Link href={ROUTES.SIGN_UP}>Sign up</Nav.Link>
                <Nav.Link href={ROUTES.SIGN_IN}>Sign in</Nav.Link>
              </>
              }
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div class="container">
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home />
            </Route>
            <Route exact path={ROUTES.TICKETS} component={Tickets}>
              <Tickets />
            </Route>
            <Route exact path={ROUTES.MY_TICKETS} component={Tickets}>
              <Tickets userId={localStorage.userId} />
            </Route>
            <Route exact path={"/tickets/:id"} component={TicketPage}>
              <TicketPage />
            </Route>
            <Route exact path={ROUTES.CREATE_TICKET} component={CreateTicket}>
              <CreateTicket />
            </Route>
            <Route exact path={ROUTES.SIGN_UP} component={Signup}>
              <Signup />
            </Route>
            <Route exact path={ROUTES.SIGN_IN} component={Signin}>
              {/* <Signin updateUser={(user) => this.setState({user})} /> */}
              <Signin />
            </Route>
            {/*
          Show created and assigned tickets upon signin
        */}
            {/* <Route exact path={} component={}>
          <MyTickets />
        </Route> */}
            {/* <Route exact path="/auth/sign-up"
        render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
      /> */}
          </Switch>
        </div>
        <Footer>
          <p>Bram Lobbens (2020)</p>
          <Link to="https://github.com/BramLobbens/TicketingApp/"><p>Github</p></Link>
        </Footer>
      </Router>

    </>
  );
}
