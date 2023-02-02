import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./BidDetail.css";
import NavBar from "../../Layouts/NavBar";
import GetProducts from "../../../Service/GetBidDetail";
import { Timer } from "../../common/timer/Timer";

const BidDetail = () => {
  const [bidId, setBidId] = useState("");
  const [bidDetail, setBidDetail] = useState("");

  // Navigation hook
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getIdByUrl();
    getBidDetails(bidId);
  }, [bidId]);

  function getIdByUrl() {
    let bidId = location && location.state.id;
    setBidId(bidId);
  }

  const getBidDetails = (bidId) => {
    if (bidId) {
      GetProducts.getBidById(bidId, (res) => {
        if (res) {
          setBidDetail(res.data && res.data.product && res.data.product);
        } else {
          navigate(`/page-not-found`);
        }
      });
    }
  };

  return (
    <Fragment>
      <Row>
        <NavBar />
      </Row>
      <Container className="shadow mt-5 p-3">
        <Row>
          <Col className="m-2">
            <div className="d-flex justify-content-center">
              <Image
                width={250}
                height={250}
                className="shadow flex-warp"
                variant="success"
                alt={bidDetail.name}
                src={bidDetail.imageUrl}
              />
            </div>
            <Row className="m-5">
              <div className="mt-3 d-flex justify-content-between">
                <div>
                  <h6>Name:</h6>
                </div>
                <div>
                  <h6>{bidDetail.name}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6>Quantity:</h6>
                </div>
                <div>
                  <h6>{bidDetail.noOfUnits}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6>Base Price:</h6>
                </div>
                <div>
                  <h6>&#8377; {bidDetail.basePrice}</h6>
                </div>
              </div>
            </Row>
            <Row className="m-5">
              <span className="mt-3 d-grid bg-danger text-white text-center">
                Bid Ends In
              </span>
              <Col className="m-1 text-center z-index-1">
                <Timer deadTime={bidDetail.bidEndDate} />
              </Col>
            </Row>
          </Col>
          <Col className="m-4">
            <div className="d-flex justify-content-between mt-4">
              <InputGroup>
                <InputGroup.Text>&#8377;</InputGroup.Text>
                <Form.Control
                  name="basePrice"
                  type="number"
                  placeholder="Enter your bid amount"
                  required
                />
              </InputGroup>
            </div>
            <div className="m-1 d-grid text-center">
              <Button variant="success" size="small">
                Bid Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BidDetail;
