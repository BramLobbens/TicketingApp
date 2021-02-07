import React, { Component } from "react";
import Select from "react-select";
import {} from "./styles/ticketform";
import api from "../../utils/api";
import { Form, Button, Alert } from "react-bootstrap";

export default class TicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      assignees: [],
      id: "", // assignee
      name: "", // assignee
      sent: false,
      success: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {
    this.getAssignees();
  }

  async getAssignees() {
    try {
      const res = await api.get('person');
      const data = res.data;

      const options = data.map(d => ({
        "value" : d.id,
        "label" : d.name
      }));

      this.setState({assignees: options});
    }
    catch(e) {
    }

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelectionChange(event) {
    this.setState({id:event.value, name:event.label});
  }

  async handleSubmit(event) {

    event.preventDefault();

    const { id, title, content } = this.state;

    const ticket = {
      personId: localStorage.getItem('userId'),
      assigneeId: id,
      title: title,
      content: content,
      postedOn: new Date(),
    };

    try {
        const res = await api.post('/ticket', ticket);
        const data = res.data;
        this.setState({success: true});
    }
    catch (e) {
      console.log(e);
    }
    this.setState({sent: true});
  }

  render() {
    const { success, sent } = this.state;

    return (
      <>
      <Form onSubmit={this.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="title">Subject</Form.Label>
        <Form.Control
            name="title"
            type="text"
            value={this.state.title}
            autoComplete="false"
            onChange={this.handleChange}
            placeholder="Subject"
        />
        <Form.Label htmlFor="content">Text</Form.Label>
        <Form.Control as="textarea" rows={5}
          name="content"
          value={this.state.content}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Description"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="title">Assign ticket to</Form.Label>
        <Select
            options={this.state.assignees}
            onChange={this.handleSelectionChange}
          />
      </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <div>
      {sent ?
        success
        ? <Alert variant='success'>Ticket created</Alert>
        : <Alert variant='warning'>Something went wrong, please try again.</Alert>
      : <p></p>
      }
      </div>
      </>
    );
  }
}
