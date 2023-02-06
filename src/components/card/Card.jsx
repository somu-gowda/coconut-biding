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
      <Row xs={1} md={3} className="g-4 m-4 shadow">
        {coconutData.map((data, idx) => (
          <Col key={idx}>
            <Card className="p-2 border border-4">
              <Card.Img
                width={200}
                height={200}
                className="flex-warp"
                variant="top"
                src={data.imageUrl}
                alt={data.name}
              />
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                  Quantity: {data.noOfUnits}
                  <span className=""> </span>
                </Card.Text>
                <Card.Text>
                  Price: &#8377; {data.basePrice}
                  <span className=""> </span>
                </Card.Text>
                {Date.parse(data.bidStartDate) > Date.parse(new Date()) ? (
                  <Row className="justify-content-center">
                    <span className="mt-1 bg-success text-white">
                      Bid Starts In
                    </span>{" "}
                    <Col className="overflow-auto m-1 text-center">
                      <Timer deadTime={data.bidStartDate} />
                    </Col>
                    {currentUser.role === CONSUMER ? (
                      <div className="m-1 d-grid text-center">
                        <Button variant="success" size="small" disabled>
                          Go to Biding
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Row>
                ) : Date.parse(data.bidEndDate) < Date.parse(new Date()) ? (
                  <Row className="justify-content-center">
                   <span className="d-grid bg-danger text-white text-center">
                      Bid Ended
                    </span>
                    <Col className="overflow-auto m-1 text-center">
                      <Timer deadTime={data.bidEndDate} />
                    </Col>
                    {currentUser.role === CONSUMER ? (
                      <div className="m-1 d-grid text-center">
                        <Button
                          variant="success"
                          size="small"
                          onClick={() => getBidDetailPage(data._id)}
                        >
                          Go to Biding
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Row>
                ) : (
                  <Row className="justify-content-center">
                    <span className="d-grid bg-danger text-white text-center">
                      Bid Ends In
                    </span>
                    <Col className="overflow-auto m-1 text-center">
                      <Timer deadTime={data.bidEndDate} />
                    </Col>
                    {currentUser.role === CONSUMER ? (
                      <div className="m-1 d-grid text-center">
                        <Button
                          variant="success"
                          size="small"
                          onClick={() => getBidDetailPage(data._id)}
                        >
                          Go to Biding
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
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
