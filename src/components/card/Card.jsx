import React, { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Timer } from "../common/timer/Timer";
import "./Card.css";

const CowCard = (props) => {
  const { coconutData } = props;
  return (
    <Fragment>
      <Row xs={1} md={3} className="g-4 m-4 card-hover">
        {coconutData.map((data, idx) => (
          <Col key={idx}>
            <Card className="shadow p-2 border border-4">
              <Card.Img
                width={200}
                height={200}
                className="shadow flex-warp"
                variant="top"
                src={data.imageUrl}
                alt={data.name}
              />
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                  Price: &#8377; {data.basePrice}
                  <span className="align-items-end"> </span>
                </Card.Text>
                {Date.parse(data.bidStartDate) > Date.parse(new Date()) ? (
                  <>
                    <span className="bg-success text-white">Bid Starts In</span>{" "}
                    <Timer deadTime={data.bidStartDate} />
                  </>
                ) : (
                  <Row>
                    <span className="bg-danger text-white text-center">Bid Ends In</span>
                    <Col className="justify-content-center mt-1">
                      <Timer deadTime={data.bidEndDate} />
                    </Col>
                    <Col className="justify-content-center">
                      <Button variant="primary" size="small">
                        Go to Biding
                      </Button>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default CowCard;
