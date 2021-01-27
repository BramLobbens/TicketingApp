import React from "react";
import {} from "./styles/ticket";

import PropTypes from "prop-types";

class TicketItem extends React.Component {
  render() {

    const { id, name, title, content, isLoading } = this.props;

    const ticketDetails = (
      <div style={{display: "inline", padding: "20px"}}>
        <p style={{display: "flex"}}>#{id}</p>
        <h4 className="">{name}</h4>
        <p style={{display: "flex"}}>{title}</p>
        <span className="">{content}</span>
      </div>
    );

    const loadingMessage = <span className="">Loading...</span>;

    return (
      <div>
        {isLoading ? loadingMessage : ticketDetails}
      </div>
    );
  }
}

TicketItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool
};

export default function Ticket(props) {
  return (
    <>
      <TicketItem
        id={props.id}
        name={props.name}
        title={props.title}
        content={props.content}
        isLoading={props.isLoading}
      />
    </>
  );
}
