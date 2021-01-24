import React from "react";
import { Ticket, ReplyForm } from "../components";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

class TicketItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      found: false,
      ticket: {},
      replies: []
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
          replies: ticketData.replies
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { found, ticket, replies, isLoading } = this.state;

    console.log(replies);

    const notFoundMessage = <span className="">Not found.</span>;
    const ticketDetails = (
      <Ticket
        isLoading={isLoading}
        id={ticket.ticketId}
        name={ticket.postedBy}
        title={ticket.title}
        content={ticket.content}
      />
    );
    const ticketReplies = (
        <div>
            <ul>
                {replies.map((reply) => (
                <li key={reply.Id}>
                    <p>{reply.postedBy}</p>
                    <p>{reply.postedOn}</p>
                    <p>{reply.content}</p>
                </li>
                ))}
            </ul>
        </div>
    );
    return (
        <>
            <div>
                {found ? ticketDetails : notFoundMessage}
            </div>
            {ticketReplies}
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
      <ReplyForm />
    </>
  );
}
