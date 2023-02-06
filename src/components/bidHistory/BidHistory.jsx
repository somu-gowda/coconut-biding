import React, { Component } from "react";
import "./BidHistory.css";

class BidHistory extends Component {
  render() {
    var historyList = this.props.bidHistory.map((data) => {
      return (
        <li className="list-group-item" key={data._id}>
          <span>{data.userName}</span>{" "}
          <span style={{ float: "right" }}>&#8377; {data.biddingAmount}</span>
        </li>
      );
    });

    return (
      <div className="col-md-12 overflow-auto">
       
        <ul className="bid-history-list list-group ">
          <li className="list-group-item">
            <span>Bidder</span>{" "}
            <span style={{ float: "right" }}>Bid Price</span>
          </li>
          {historyList}
        </ul>
      </div>
    );
  }
}

export default BidHistory;
