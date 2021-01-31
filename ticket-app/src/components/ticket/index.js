import React from "react";
import {} from "./styles/ticket";

import PropTypes from "prop-types";

class TicketItem extends React.Component {
  render() {

    const { id, name, title, content, date, isLoading, status } = this.props;

    const ticketHeaders = (
      <div style={{display: "inline", padding: "20px"}}>
        <p style={{display: "flex"}}>Ticket#{id} ({new Date(date).toLocaleDateString(navigator.language)})</p>
        <p><i>Posted by: {name}</i></p>
        <p>Status: {status}</p>
        <hr/>
      </div>
    );
    const ticketDetails = (
      <div style={{display: "inline", padding: "20px"}}>
        <p style={{display: "flex"}}>Ticket#{id}</p>
        <p><i>Posted by: {name}</i></p>
        <p><i>On: {new Date(date).toLocaleDateString(navigator.language)}</i></p>
        <p style={{display: "flex"}}><i>Title: {title}</i></p>
        <p>{content}</p>
        <hr/>
      </div>
    );

    const loadingMessage = <span className="">Loading...</span>;

    return (
      <>
      {content ?
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
  status: PropTypes.string
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
      />
    </>
  );
}
