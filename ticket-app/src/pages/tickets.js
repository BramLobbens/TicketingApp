import React from "react";
import { Ticket } from "../components";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";

class TicketList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tickets: [],
      userId: props.userId,
      numberOfTickets: "",
    };
  }

  async componentDidMount() {
    const { userId } = this.state;

    let ticketData;
    if (userId) {
      ticketData = await api.get(`/ticket/user/${userId}`);
    } else {
      ticketData = await api.get("/ticket");
    }

    ticketData = ticketData.data;

    this.setState({
      ...this.state,
      ...{
        isLoading: false,
        tickets: ticketData,
        numberOfTickets: ticketData.length,
      },
    });
  }

  render() {
    const { tickets, isLoading, userId, numberOfTickets } = this.state;

    return isLoading ? (
      "loading"
    ) : (
      <>
        <p>total: {numberOfTickets}</p>
        <ul style={{ display: "inline" }}>
          {tickets.map((ticket) => (
            <li key={ticket.ticketId} style={{ display: "block" }}>
              <Link to={`/tickets/${ticket.ticketId}`}>
                {userId && (
                  <Ticket
                    userId={userId}
                    name={ticket.postedBy}
                    date={ticket.postedOn}
                    isLoading={isLoading}
                    id={ticket.ticketId}
                    title={ticket.title}
                    status={ticket.status}
                    content={ticket.content}
                    header={true}
                  />
                )}
                {!userId && (
                  <Ticket
                    name={ticket.postedBy}
                    date={ticket.postedOn}
                    isLoading={isLoading}
                    id={ticket.ticketId}
                    title={ticket.title}
                    status={ticket.status}
                    content={ticket.content}
                    header={true}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

class TicketListAssigned extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tickets: [],
      userId: props.userId,
      numberOfTickets: "",
    };
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await api.get(`/ticket/assigned/${userId}`);
    const data = res.data;

    this.setState({
      ...this.state,
      ...{
        isLoading: false,
        tickets: data,
        numberOfTickets: data.length,
      },
    });
  }

  render() {
    const { tickets, isLoading, userId, numberOfTickets } = this.state;

    return isLoading ? (
      "loading"
    ) : (
      <>
        <p>total: {numberOfTickets}</p>
        <ul style={{ display: "inline" }}>
          {tickets.map((ticket) => (
            <li key={ticket.ticketId} style={{ display: "block" }}>
              <Link to={`/tickets/${ticket.ticketId}`}>
                <Ticket
                  userId={userId}
                  name={ticket.postedBy}
                  date={ticket.postedOn}
                  isLoading={isLoading}
                  id={ticket.ticketId}
                  title={ticket.title}
                  status={ticket.status}
                />
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default function Tickets(props) {
  return (
    <>
      {props.userId && (
        <>
          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h1>My Issued Tickets</h1>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <TicketList userId={props.userId} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  <h1>My Assigned Tickets</h1>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <TicketListAssigned userId={props.userId} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      )}
      {props.userId == null && (
        <>
          <h1>Tickets</h1>
          <TicketList />
        </>
      )}
    </>
  );
}
