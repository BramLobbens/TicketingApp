import React from "react";
import { Ticket } from "../components";
import * as API from "../constants/api";

class TicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  componentDidMount() {
    const url = API.TICKET;
    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ tickets: data }));
  }

  // extract to Ticket component
  render() {
    const { tickets } = this.state;
    return (
      <>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.content}</p>
              <p>{ticket.postedOn}</p>
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
      <TicketList />
    </>
  );
}
