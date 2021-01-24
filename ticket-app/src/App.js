import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import {
  Home,
  TicketPage,
  Tickets,
  CreateTicket,
  Signin,
  Signup,
} from "./pages";

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.TICKETS}>Tickets</Link>
          </li>
          <li>
            <Link to={ROUTES.CREATE_TICKET}>Create Ticket</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
          </li>
          <li>
            <Link to="">My Tickets</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTES.TICKETS} component={Tickets}>
          <Tickets />
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
    </Router>
  );
}
