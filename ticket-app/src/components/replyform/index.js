import React, { Component } from "react";
import {} from "./styles/replyform";
import API from "../../utils/api";
import { useParams } from "react-router-dom";

class Form extends Component {
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

  async handleSubmit(event) {
    try {
        // const response = await API.post('/ticket/reply',
        // {
        //     personId: 1, // temp for testing
        //     ticketId: 14, //this.props.id,
        //     content: "test", //this.state.content,
        //     postedOn: new Date(),
        // });
        // console.log(response)

        const reply = {
            personId: localStorage.getItem('userId'),
            ticketId: this.props.id,
            content: this.state.content,
            postedOn: new Date(),
          };

          const request = new Request('https://localhost:5001/api/ticket/reply', {
            method: "POST",
            body: JSON.stringify(reply),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });

          fetch(request)
            .then((res) => res.json())
            .then((res) => console.log(res));
    } catch (e) {
        console.log(e);
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="content">Description</label>
        <textarea
          name="content"
          value={this.state.content}
          autoComplete="false"
          onChange={this.handleChange}
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default function ReplyForm(props) {
    const { id } = useParams();
  return <Form id={id} />;
}
