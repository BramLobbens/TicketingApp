import React, { Component } from "react";
import { SigninForm } from "../components";

//temp
class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    this.setState({
      user: localStorage.getItem('userName')
    });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Signout</button>
      </form>
    );
  }
}

export default function Signin(props) {

  return (
    <>
      <h1>Sign in</h1>
      <SigninForm />
      <p>(temp) Sign out</p>
      <Signout />
    </>
  );
}
