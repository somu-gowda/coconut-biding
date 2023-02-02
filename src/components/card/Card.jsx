import React, { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Timer } from "../common/timer/Timer";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const CONSUMER = "CONSUMER";

const CowCard = (props) => {
  const { coconutData, currentUser } = props;

  // Navigation hook
  const navigate = useNavigate();

  const getBidDetailPage = (id) => {
    navigate(`/details/${id}`, { state: { id: id } });
  };

  return (
    <Fragment>
      <Row xs={1} md={3} className="g-4 m-4 card-hover">
        {coconutData.map((data, idx) =>
          Date.parse(data.bidEndDate) > Date.parse(new Date()) ? (
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
                  Quantity: {data.noOfUnits}
                    <span className="align-items-end"> </span>
                  </Card.Text>
                  <Card.Text>
                    Price: &#8377; {data.basePrice}
                    <span className="align-items-end"> </span>
                  </Card.Text>
                  {Date.parse(data.bidStartDate) > Date.parse(new Date()) ? (
                    <Row className="justify-content-center">
                      <span className="mt-1 bg-success text-white">
                        Bid Starts In
                      </span>{" "}
                      <Col className="m-1 text-center z-index-1">
                      <Timer deadTime={data.bidStartDate} />
                      </Col>
                      <Col className="m-1 d-grid text-center">
                          <Button
                            variant="success"
                            size="small"
                            disabled
                          >
                            Go to Biding
                          </Button>
                        </Col>
                    </Row>
                  ) : Date.parse(data.bidEndDate) < Date.parse(new Date()) ? (
                    <Row className="justify-content-center">
                      <span className="d-grid bg-danger text-white text-center">
                        Bid Ended
                      </span>
                    </Row>
                  ) : (
                    <Row className="justify-content-center">
                      <span className="d-grid bg-danger text-white text-center">
                        Bid Ends In
                      </span>
                      <Col className="m-1 text-center z-index-1">
                        <Timer deadTime={data.bidEndDate} />
                      </Col>
                      {currentUser.role === CONSUMER ? (
                        <Col className="m-1 d-grid text-center">
                          <Button
                            variant="success"
                            size="small"
                            onClick={() => getBidDetailPage(data._id)}
                          >
                            Go to Biding
                          </Button>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ) : (
            ""
          )
        )}
      </Row>
    </Fragment>
  );
};

export default CowCard;
