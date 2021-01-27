import React, { Component } from "react";
import {} from "./styles/signinform";
import axios from "axios";

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

  async handleSubmit(event) {
    event.preventDefault();

    const { username: name, password } = this.state;

    try {
      const res = await axios({
        method: 'POST',
        url: 'https://localhost:5001/api/signin',
        data: {
          name,
          password,
        }
      })
      console.log(res);

      const data = res.data;
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.userName);
    }
    catch (err) {
      console.log(err);
    }
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

export default function SigninForm() {
  return <Form />;
}
