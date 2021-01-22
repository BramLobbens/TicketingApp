import React, { Component } from "react";
import {} from "./styles/signinform";
import * as API from "../../constants/api";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const url = API.SIGNIN;

    const signin = {
      name: this.state.username,
      password: this.state.password,
    };

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(signin),
      headers: new Headers({
        "Content-Type": "application/json",
        "crossDomain": true,
        "xhrFields": { "withCredentials": true }
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
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={this.state.username}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={this.state.password}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
      </form>
    );
  }
}

export default function SigninForm(props) {
  return <Form />;
}
