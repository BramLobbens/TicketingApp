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
      passwordCheck: "",
      passwordMatch: false,
      passwordCheckMessage: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  checkPassword(event) {
    const { password, passwordCheck } = this.state;

    if (password === "" && passwordCheck === "") {
      this.setState({
        passwordMatch: false,
        passwordCheckMessage: ""});
    }
    else if ((password !== "" && passwordCheck !== "") && (password === passwordCheck)) {
      this.setState({
        passwordMatch: true,
        passwordCheckMessage: "✓ Passwords match"});
    }
    else {
      this.setState({passwordCheckMessage: "✖ Passwords are not matching"});
    }
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

    const { passwordCheckMessage } = this.state;

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
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Email"
        />
        <div>
          <p>{passwordCheckMessage}</p>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            autoComplete="false"
            onChange={this.handleChange}
            onKeyUp={this.checkPassword}
            placeholder="Password"
          />
          <label htmlFor="password">Repeat Password</label>
          <input
            name="passwordCheck"
            type="password"
            value={this.state.passwordCheck}
            autoComplete="false"
            onChange={this.handleChange}
            onKeyUp={this.checkPassword}
            placeholder="Repeat Password"
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

export default function SignupForm(props) {
  return <Form />;
}
