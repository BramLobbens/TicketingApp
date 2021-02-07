import React, { Component } from "react";
import {} from "./styles/signinform";
import api from "../../utils/api";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import * as ROUTES from "../../constants/routes";

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      sent: false,
      success: false,
      redirectMessage: "",
      variant: "",
      errorMessage: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { username: name, password } = this.state;

    await api.post('/signin', { name: name, password: password })
    .then((res) => {
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.userName);

      this.setState({
        success: res.status === 200,
        redirectMessage: "Sign in successful.",
        variant: "success"
      })
    })
    .catch((error) => {
      console.log(error.response);
      this.setState({
        errorMessage: error !== null ? error.response : "Login failed",
        success: false,
      });
    });
    setTimeout(() => this.setState({sent: true}), 2000);
  }

  render() {
    const { sent, success, redirectMessage, variant, errorMessage } = this.state;

    if (sent && success) {
      return (
        <Redirect to={ROUTES.HOME} />
      );
    }

    return (
      <>
      {redirectMessage !== "" &&
        <Alert variant={variant}>{redirectMessage}</Alert>
      }
      {errorMessage !== "" &&
          <Alert variant='warning'>{errorMessage.status} {errorMessage.statusText}</Alert>
      }
      <Form onSubmit={this.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          value={this.state.username}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Enter username"
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          value={this.state.password}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Enter password"
        />
        </Form.Group>
        <Button type="submit">Sign in</Button>
      </Form>
      </>
    );
  }
}