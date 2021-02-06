import React, { Component } from "react";
import Select from "react-select";
import {} from "./styles/ticketform";
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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Subject:</label>
        </div>
        <div>
          <input
            name="title"
            type="text"
            value={this.state.title}
            autoComplete="false"
            onChange={this.handleChange}
            placeholder="Subject"
          />
        </div>
        <div>
        <label htmlFor="content">Your message:</label>
        </div>
        <div>
        <textarea
          name="content"
          value={this.state.content}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Description"
        />
        </div>
        <p>Assignee:</p>
        <Select
          options={this.state.assignees}
          onChange={this.handleSelectionChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
      {sent ?
        success
        ? <p>Ticket created</p>
        : <p>Something went wrong, please try again.</p>
      : <p></p>
      }
      </div>
      </>
    );
  }
}

export default function TicketForm(props) {
  return <Form />;
}
