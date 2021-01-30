import React, { Component } from "react";
import Select from "react-select";
import {} from "./styles/ticketform";
import * as API from "../../constants/api";
import api from "../../utils/api";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      assignees: [],
      id: "", // assignee
      name: "", // assignee
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {
    this.getAssignees();
  }

  async getAssignees() {
    const res = await api.get('person');
    const data = res.data;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name
    }))
    this.setState({assignees: options})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelectionChange(event) {
    this.setState({id:event.value, name:event.label});
  }

  handleSubmit(event) {
    const { id, title, content } = this.state;

    const url = API.TICKET;

    const ticket = {
      personId: localStorage.getItem('userId'),
      assigneeId: id,
      title: title,
      content: content,
      postedOn: new Date(),
    };

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
      }),
    });

    fetch(request, {
      //credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Subject</label>
        <input
          name="title"
          type="text"
          value={this.state.title}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Subject"
        />
        <label htmlFor="content">Description</label>
        <textarea
          name="content"
          value={this.state.content}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Description"
        />
        <p>Assignee:</p>
        <Select
          options={this.state.assignees}
          onChange={this.handleSelectionChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default function TicketForm(props) {
  return <Form />;
}
