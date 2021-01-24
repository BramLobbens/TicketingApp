import React from "react";
import { Ticket } from "../components";
import API from "../utils/api";
import { useParams } from "react-router-dom";

class TicketItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      found: false,
      ticket: {},
    };
  }

  async componentDidMount() {
    try {
      let ticketData = await API.get(`/ticket/${this.props.id}`);
      ticketData = ticketData.data;

      this.setState({
        ...this.state,
        ...{
          isLoading: false,
          found: true,
          ticket: { ...ticketData },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { found, ticket, isLoading } = this.state;

    const notFoundMessage = <span className="">Not found.</span>;
    const ticketDetails = (
      <Ticket
        isLoading={isLoading}
        id={ticket.tickeId}
        name={ticket.postedBy}
        title={ticket.title}
        content={ticket.content}
      />
    );
    return <div>{found ? ticketDetails : notFoundMessage}</div>;
  }
}

export default function TicketPage(props) {
  const { id } = useParams();
  return <TicketItem id={id} />;
}
