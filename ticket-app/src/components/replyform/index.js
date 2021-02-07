import React, { Component, useState, Location } from "react";
import {} from "./styles/replyform";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";


class Form_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      sent: false,
      success: false,
      message: "",
      variant: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {

    event.preventDefault();

    const { content } = this.state;

    if (content === "") {
      this.setState({
        success: false,
        message: "Message may not be empty.",
        variant: "primary"
      });
  }

    const personId = localStorage.getItem('userId');
    const ticketId = this.props.id;
    const postedOn = new Date();

    {content &&
    await api.post('/ticket/reply',
      {
        personId,
        ticketId,
        content,
        postedOn,
      })
      .then((res) => {
        this.setState({
          success: res.status === 201,
          message: "Reply sent succesfully.",
          variant: "success"
        });
      })
      .catch((error) => {
        this.setState({
          success: false,
          message: "Something went wrong.",
          variant: "warning"
        });
      });
      setTimeout(() => this.setState({sent: true}), 2000);
    }
  }

  render() {
    const { sent, success, message, variant } = this.state;

    return (
      <>
      <hr/>
      {message !== "" &&
        <Alert variant={variant}>{message}</Alert>
      }
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
        <Form.Label htmlFor="content">
        <h2>💬 Post a reply</h2>
        </Form.Label>
        <Form.Control as="textarea" rows={5}
            name="content"
            value={this.state.content}
            autoComplete="false"
            onChange={this.handleChange}
            placeholder="Write message..."
          />
          </Form.Group>
        <Button type="submit">Post Reply</Button>
      </Form>
      <hr/>
      </>
    );
  }
}

export default function ReplyForm(props) {
    const { id } = useParams();
  return <Form_ id={id} />;
}
