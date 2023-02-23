import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Timer } from "../common/timer/Timer";
import { useNavigate } from "react-router-dom";
import WalletAPI from "../modal/wallet/WalletApi";
import { ToastContainer, toast } from "react-toastify";

// constants
const CONSUMER = "CONSUMER";

const CoConutCard = ({ coconutData, currentUser, getInterValTime, wallet }) => {
  // Navigation hook
  const navigate = useNavigate();
  // state
  const [walletDetails, setWalletDetails] = useState("");

  useEffect(() => {
    let name = currentUser?.userName;
    getWallDeatil(name, setWalletDetails);
  }, [wallet]);

  const getWallDeatil = (userName, callBack) => {
    WalletAPI.getApi(userName, callBack);
  };

  // Consumer wallate amount validation
  const getBidDetailPage = (id, basePrice) => {
    let name = currentUser?.userName;
    getWallDeatil(name, setWalletDetails);
    let amount = walletDetails?.data?.wallet?.amount;
    let role = currentUser?.role;

    if (role !== CONSUMER) {
      navigate(`/details/${id}`, {
        state: { id: id, currentUser: currentUser },
      });
    } else if (amount >= 1.5 * basePrice) {
      navigate(`/details/${id}`, {
        state: { id: id, currentUser: currentUser },
      });
    } else {
      toast("Your wallet must contain two times the base price.");
    }
  };

  // get bidding time to validate
  const getTimeInterVal = (time) => {
    getInterValTime && getInterValTime(time);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Row xs={1} md={4} lg={4} className="g-4 m-4 shadow">
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
                    <span className="mt-1 bg-success text-white text-center">
                      Bid Starts In
                    </span>{" "}
                    <Col className="overflow-auto m-1 text-center">
                      <Timer
                        deadTime={data.bidStartDate}
                        getTimeInterVal={getTimeInterVal}
                      />
                    </Col>
                    <div className="mt-1 d-grid text-center">
                      <Button variant="success" size="small" disabled>
                        Go to Biding
                      </Button>
                    </div>
                  </Row>
                ) : Date.parse(data.bidEndDate) < Date.parse(new Date()) ? (
                  <Row className="justify-content-center">
                    <span className="d-grid bg-danger text-white text-center">
                      Bid Ended
                    </span>
                    <Col className="overflow-auto m-1 text-center">
                      <Timer
                        deadTime={data.bidEndDate}
                        getTimeInterVal={getTimeInterVal}
                      />
                    </Col>

                    <div className="mt-1 d-grid text-center">
                      <Button
                        variant="success"
                        size="small"
                        onClick={() =>
                          getBidDetailPage(data._id, data.basePrice)
                        }
                      >
                        Go to Biding
                      </Button>
                    </div>
                  </Row>
                ) : (
                  <Row className="justify-content-center">
                    <span className="d-grid bg-danger text-white text-center">
                      Bid Ends In
                    </span>
                    <Col className="overflow-auto m-1 text-center">
                      <Timer
                        deadTime={data.bidEndDate}
                        getTimeInterVal={getTimeInterVal}
                      />
                    </Col>

                    <div className="mt-1 d-grid text-center">
                      <Button
                        variant="success"
                        size="small"
                        onClick={() =>
                          getBidDetailPage(data._id, data.basePrice)
                        }
                      >
                        Go to Biding
                      </Button>
                    </div>
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

export default CoConutCard;
