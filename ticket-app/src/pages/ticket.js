import React from "react";
import { Ticket, ReplyForm } from "../components";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, Button, Card, Accordion } from "react-bootstrap";

class TicketItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      found: false,
      ticket: {},
      replies: [],
      id: "",
      status: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();
    this.setState({status: "Closed"});

    const { id } = this.state;

      try {
        const res = await api.put(`/ticket/${id}`, { status: 'Closed' });
        const data = res.data;
      }
      catch (e) {
        console.log(e);
      }
  }

  async componentDidMount() {
    try {
      const res = await api.get(`/ticket/${this.props.id}`);
      const data = res.data;

      this.setState({
        ...this.state,
        ...{
          isLoading: false,
          found: true,
          ticket: { ...data },
          replies: data.replies,
          id: data.ticketId,
          status: data.status,
        },
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { found, ticket, replies, isLoading, status } = this.state;

    const notFoundMessage = <span className="">Not found.</span>;
    const ticketDetails = (
      <Ticket
        isLoading={isLoading}
        id={ticket.ticketId}
        name={ticket.postedBy}
        title={ticket.title}
        content={ticket.content}
        date={ticket.postedOn}
        status={status}
      />
    );
    console.log(replies);
    const ticketReplies = (
        <Accordion defaultActiveKey="0">
            <ul>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <div>
              <p>Replies ▼</p>
            </div>
            </Accordion.Toggle>
                {replies.map((reply) => (
                <li key={reply.Id}>
                <Accordion.Collapse eventKey="0">
                <div className="reply-container">

                  <Card.Header>
                  <Card.Title>
                    <div className="avatar">#{reply.personId}</div>
                    </Card.Title>
                    <Card.Subtitle>Posted by: user id#{reply.personId} On {new Date(reply.postedOn).toLocaleDateString(navigator.language)}</Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{reply.content}</Card.Text>
                  </Card.Body>
                  </div>
                  </Accordion.Collapse>
                </li>
                ))}
            </ul>
        </Accordion>
    );
    return (
        <>
            <div>
                {found ? ticketDetails : notFoundMessage}
            </div>
            {ticketReplies}
            {status.toLowerCase() === "open" &&
            <div id="#reply-form">
              <ReplyForm />
            </div>
            }
            {status.toLowerCase() === "open" && (localStorage.getItem("userName") === ticket.postedBy) &&
              <Button variant="warning" type="submit" onClick={this.handleClick}>Close ticket</Button>
            }
            {status.toLowerCase() === "closed" &&
              <p>Marked as closed</p>
            }

        </>
        );
  }
}

export default function TicketPage(props) {
  const { id } = useParams();
  return (
    <>
      <Link to="/tickets">/tickets</Link>
      <Link to={`/tickets/${id}`}>/{id}</Link>
      <TicketItem id={id} />
    </>
  );
}
