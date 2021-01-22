import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, Tickets, CreateTicket, Signin, Signup } from "./pages";

export default function App() {
  return (
    <Router>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route exact path={ROUTES.TICKETS}>
        <Tickets />
      </Route>
      <Route exact path={ROUTES.CREATE_TICKET}>
        <CreateTicket />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <Signup />
      </Route>
      <Route exact path={ROUTES.SIGN_IN}>
        <Signin />
      </Route>
      {/* <Route exact path="/auth/sign-up"
        render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
      /> */}
    </Router>
  );
}
