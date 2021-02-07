import React from "react";
import {} from "./styles/ticket";
import { Card, Badge } from 'react-bootstrap';
import PropTypes from "prop-types";

class TicketItem extends React.Component {
  render() {

    const { id, name, title, content, date, isLoading, status, header } = this.props;

    const ticketHeaders = (
      <>
      <Card.Body>
          <p class="p-header">{id}. {title}</p> <span class style={{float: 'right'}}>{new Date(date).toLocaleDateString(navigator.language)} <Badge variant={status === "Open" ? 'success' : 'secondary'}>{status}</Badge></span>
      </Card.Body>
      <Card.Body>
        <p class="p-header">{content}</p>
      </Card.Body>
      {/* <div style={{display: "inline", padding: "20px"}}>
        <p style={{display: "flex"}}>Ticket#{id} ({new Date(date).toLocaleDateString(navigator.language)})</p>
        <p><i>Posted by: {name}</i></p>
        <p>Status: {status}</p>
        <hr/>
      </div> */}
      </>
    );
    const ticketDetails = (
      <>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Posted by: <Card.Link href="#">{name}</Card.Link> on {new Date(date).toLocaleDateString(navigator.language)}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Footer>Status: {status}</Card.Footer>
      </>
    );

    const loadingMessage = <span className="">Loading...</span>;

    return (
      <>
      {/* {content ? */}
      {!header ?
        <div>
          {isLoading ? loadingMessage : ticketDetails}
        </div>
      :
        <div>
          {isLoading ? loadingMessage : ticketHeaders}
        </div>
      }
      </>

    );
  }
}

TicketItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  isLoading: PropTypes.bool,
  status: PropTypes.string,
  header: PropTypes.bool
};

export default function Ticket(props) {
  return (
    <>
      <TicketItem
        id={props.id}
        name={props.name}
        title={props.title}
        content={props.content}
        date={props.date}
        isLoading={props.isLoading}
        status={props.status}
        header={props.header}
      />
    </>
  );
}
