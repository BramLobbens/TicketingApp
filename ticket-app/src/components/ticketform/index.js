import React from "react";
import {} from "./styles/ticketform";
import * as API from "../../constants/api";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const url = API.TICKET;

    const ticket = {
      title: this.state.title,
      content: this.state.content,
      postedOn: new Date(),
    };

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ticket),
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
        <label for="title">Title:</label>
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label for="content">Content:</label>
        <textarea
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
          placeholder="My ticket details..."
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default function TicketForm(props) {
  return <Form />;
}
