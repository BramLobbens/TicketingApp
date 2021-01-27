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
    };
  }

  async componentDidMount() {

    const { userId } = this.state;

    console.log(userId);

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
      },
    });
  }

  render() {
    const { tickets, isLoading, userId } = this.state;

    return isLoading ? (
      "loading"
    ) : (
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
    );
  }
}

export default function Tickets(props) {
  return (
    <>
      {props.userId &&
      <>
        <h1>My Tickets</h1>
        <TicketList userId={ props.userId } />
        <h1>Assigned Tickets</h1>
        <p>to do...</p>
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
