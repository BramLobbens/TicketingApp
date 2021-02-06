import React, { Component } from "react";
import {} from "./styles/replyform";
import api from "../../utils/api";
import { useParams } from "react-router-dom";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
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

    const { content } = this.state;
    const personId = localStorage.getItem('userId');
    const ticketId = this.props.id;
    const postedOn = new Date();

    try {
      const res = await api.post('/ticket/reply',
        {
          personId,
          ticketId,
          content,
          postedOn,
        });
        console.log(res);
        this.setState({success: res.status === 201});
    } catch (e) {
        console.log(e);
        this.setState({success: false});
    }
    this.setState({sent: true});
  }

  render() {
    const { sent, success } = this.state;

    return (
      <>
      <hr/>

      <form onSubmit={this.handleSubmit}>
        <div>
        {sent ?
          success
          ? <p>Reply sent succesfully</p>
          : <p>Something went wrong, please try again.</p>
        : <p></p>
        }
          <label htmlFor="content">Send a reply:</label>
        </div>
        <div>
          <textarea
            name="content"
            value={this.state.content}
            autoComplete="false"
            onChange={this.handleChange}
            placeholder="Write message..."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </>
    );
  }
}

export default function ReplyForm(props) {
    const { id } = useParams();
  return <Form id={id} />;
}
