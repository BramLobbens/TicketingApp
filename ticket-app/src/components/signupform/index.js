import React, { Component } from "react";
import {} from "./styles/signupform";
import api from "../../utils/api";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";

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
      sent: false,
      success: false,
      redirectMessage: "",
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
        passwordCheckMessage: "👍 Passwords match"});
    }
    else {
      this.setState({passwordCheckMessage: "😦 Passwords are not matching"});
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  async handleSubmit(event) {
    event.preventDefault();

    const { username: name, email, password } = this.state;

    try {
      const res = await api.post('/person', {
        name: name, email: email, password: password
      });
      this.setState({success: (res.status === 200 || res.status === 201) });
      this.setState({redirectMessage: "Sign in succesful. Redirecting..."});
      setTimeout(() => this.setState({success: true}), 2000);
      const data = res.data;
    }
    catch(e) {
      this.setState({success: false});
    }
    this.setState({sent: true});
  }

  render() {

    const { passwordCheckMessage, sent, success, redirectMessage } = this.state;

    if (success) {
      return (
          <Redirect to={ROUTES.SIGN_IN} />
      );
    }

    return (
      <>
      <p>{redirectMessage}</p>
      {sent ?
        success
        ? <p>Sign in successful. Redirecting...</p>
        : <p>Something went wrong, please try again.</p>
      : <p></p>
      }
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
      </>
    );
  }
}

export default function SignupForm(props) {
  return <Form />;
}
