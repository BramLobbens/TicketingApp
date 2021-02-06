import React, { Component } from "react";
import {} from "./styles/signinform";
import api from "../../utils/api";

class Form extends Component {
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
        ? <p>Sign in successful</p>
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
      </>
    );
  }
}

export default function SigninForm() {
  return <Form />;
}
