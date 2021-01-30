import React from "react";
import { Ticket } from "../components";
import API from "../utils/api";
import { Link } from "react-router-dom";

class TicketList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tickets: [],
      userId: props.userId,
      numberOfTickets: ""
    };
  }

  async componentDidMount() {

    const { userId, numberOfTickets } = this.state;

    let ticketData
    if (userId) {
      ticketData = await API.get(`/ticket/user/${userId}`);
    }
    else {
      ticketData = await API.get("/ticket");
    }

    ticketData = ticketData.data;

    this.setState({
      ...this.state,
      ...{
        isLoading: false,
        tickets: ticketData,
        numberOfTickets: ticketData.length
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
      <ul style={{display: "inline"}}>
        {tickets.map((ticket) => (
          <li key={ticket.ticketId} style={{display: "block"}}>
            <Link to={`/tickets/${ticket.ticketId}`}>
            {userId &&
              <Ticket
                userId={userId}
                isLoading={isLoading}
                id={ticket.ticketId}
                title={ticket.title}
              />
            }
            {!userId &&
              <Ticket
                isLoading={isLoading}
                id={ticket.ticketId}
                title={ticket.title}
                />
            }
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
      numberOfTickets: ""
    };
  }

  async componentDidMount() {

    const { userId } = this.state;
    const res = await API.get(`/ticket/assigned/${userId}`);
    const data = res.data;

    this.setState({
      ...this.state,
      ...{
        isLoading: false,
        tickets: data,
        numberOfTickets: data.length
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
      <ul style={{display: "inline"}}>
        {tickets.map((ticket) => (
          <li key={ticket.ticketId} style={{display: "block"}}>
          <Link to={`/tickets/${ticket.ticketId}`}>
            <Ticket
              userId={userId}
              isLoading={isLoading}
              id={ticket.ticketId}
              title={ticket.title}
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
      {props.userId &&
      <>
        <h1>My Issued Tickets</h1>
        <TicketList userId={ props.userId } />
        <h1>My Assigned Tickets</h1>
        <TicketListAssigned userId={ props.userId } />
      </>
      }
      {props.userId == null &&
      <>
        <h1>Tickets</h1>
        <TicketList />
      </>
      }
    </>
  );
}
