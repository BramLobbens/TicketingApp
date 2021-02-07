import React, { Component } from "react";
import {} from "./styles/signupform";
import api from "../../utils/api";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert, Col } from 'react-bootstrap';

export default class SignupForm extends Component {
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
      variant: "",
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
        passwordCheckMessage: "👍 Passwords match",
        variant: 'info'});
    }
    else {
      this.setState({
        passwordCheckMessage: "😦 Passwords are not matching",
        variant: 'danger'
      });
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

    const { passwordCheckMessage, sent, success, redirectMessage, variant } = this.state;

    if (success) {
      return (
          <Redirect to={ROUTES.SIGN_IN} />
      );
    }

    return (
      <>
      <Alert variant='light'>{redirectMessage}</Alert>
      {sent ?
        success
        ? <Alert>Sign in successful. Redirecting...</Alert>
        : <Alert variant='warning'>Something went wrong, please try again.</Alert>
      : <p></p>
      }
      <Form onSubmit={this.handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
              name="username"
              type="text"
              value={this.state.username}
              autoComplete="false"
              onChange={this.handleChange}
              placeholder="Enter username"
            />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            type="email"
            value={this.state.email}
            autoComplete="false"
            onChange={this.handleChange}
            placeholder="Enter email"
            />
          <Form.Text>Your email will not be shared</Form.Text>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={this.state.password}
            autoComplete="false"
            onChange={this.handleChange}
            onKeyUp={this.checkPassword}
            placeholder="Enter password"
          />
          <Form.Text>Password must have minimum length of 6</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="passwordCheck">Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordCheck"
            value={this.state.passwordCheck}
            autoComplete="false"
            onChange={this.handleChange}
            onKeyUp={this.checkPassword}
            placeholder="Enter password"
          />
        </Form.Group>
        </Form.Row>
        <Form.Text>
            {passwordCheckMessage &&
              <Alert variant={variant}>{passwordCheckMessage}</Alert>
            }
        </Form.Text>
        <Button type="submit">Sign up</Button>
      </Form>
      </>
    );
  }
}
