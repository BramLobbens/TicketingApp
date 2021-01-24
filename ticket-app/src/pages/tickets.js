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
    };
  }

  async componentDidMount() {
    let ticketData = await API.get("/ticket");
    ticketData = ticketData.data;

    this.setState({
      ...this.state,
      ...{
        isLoading: false,
        tickets: ticketData,
      },
    });
  }

  render() {
    const { tickets, isLoading } = this.state;

    return isLoading ? (
      "loading"
    ) : (
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticketId}>
            <Link to={`/tickets/${ticket.ticketId}`}>
              <Ticket
                isLoading={isLoading}
                id={ticket.ticketId}
                title={ticket.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default function Tickets(props) {
  return (
    <>
      <h1>Tickets</h1>
      <TicketList />
    </>
  );
}
