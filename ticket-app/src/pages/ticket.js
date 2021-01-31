import React from "react";
import { Ticket, ReplyForm } from "../components";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    const data = {
      status: "Closed"
    }
    const url = `https://localhost:5001/api/ticket/${id}`;

      try {
        const request = new Request(url, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
          }),
        });

        fetch(request, {
          //credentials: "include"
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
        // const res = await axios({
        //   method: 'PATCH',
        //   url: `https://localhost:5001/api/ticket/${id}`,
        //   headers: {
        //     "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
        //   },
        //   data: {
        //     status: "Closed",
        //   }
        // })
        // console.log(res);
      }
      catch (err) {
        console.log(err);
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
    } catch (e) {
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
      />
    );
    console.log(replies);
    const ticketReplies = (
        <div>
            <ul>
                {replies.map((reply) => (
                <li key={reply.Id}>
                    {/* <p>{reply.postedBy}</p> */}
                    <p><i>Posted by: user id#{reply.personId}</i></p>
                    <p><i>On: {new Date(reply.postedOn).toLocaleDateString(navigator.language)}</i></p>
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
            {status.toLowerCase() === "open" &&
              <ReplyForm />
            }
            {status.toLowerCase() === "open" && (localStorage.getItem("userName") === ticket.postedBy) &&
              <button type="submit" onClick={this.handleClick}>Mark as closed</button>
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
