import React, { Component, useState } from "react";
import {} from "./styles/signinform";
import api from "../../utils/api";
import { Form, Button, Alert } from "react-bootstrap";

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      sent: false,
      success: false,
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

    try {
      const res = await api.post('/signin', { name: name, password: password });
      this.setState({success: res.status === 200});

      const data = res.data;
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.userName);
    }
    catch (err) {
      console.log(err);
      this.setState({success: false});
    }
    this.setState({sent: true});
  }

  render() {
    const { sent, success } = this.state;

    return (
      <>
      {sent ?
        success
        ? <Alert variant='success'>Sign in successful</Alert>
        : <Alert variant='warning'>Something went wrong, please try again.</Alert>
      : <p></p>
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