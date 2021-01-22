import React, { Component } from "react";
import {} from "./styles/signupform";
import * as API from "../../constants/api";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const url = API.SIGNUP;

    const signup = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(signup),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    fetch(request)
      .then((res) => res.json())
      .then((res) => console.log(res));

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username<span style={{color:"red"}}>*</span></label>
        <input
          name="username"
          type="text"
          value={this.state.username}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Username"
        />
        <label htmlFor="email">Email<span style={{color:"red"}}>*</span></label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Email"
        />
        <label htmlFor="password">Password<span style={{color:"red"}}>*</span></label>
        <input
          name="password"
          type="password"
          value={this.state.password}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

export default function SignupForm(props) {
  return <Form />;
}
