import React, { Fragment, useEffect, useState } from "react";
import CowCard from "../card/Card";
import NavBar from "../Layouts/NavBar";
import "./DashboardPage.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import WebCookies from "../../components/common/Cookies/cookies";
import ProductAddModal from "../modal/ProductAddModal";
import AddProducts from "../modal/ProductAddApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NoRecordsFound from "../../components/NoRecordsFound"

const PRODUCER = "PRODUCER";

const DashboardPage = () => {
  const [state, setState] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [addProductModalOpen, setAddProductModaloOpen] = useState(false);
  const [time, setTime] = useState();

  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    getUserInCookie();
    getCoconutData(setState);

    setInterval(() => {
      getCoconutData(setState);
    }, 10000);
  }, []);

  const getCoconutData = (setState) => {
    AddProducts.getApi((res) => {
      if (res) {
        setState(res.data.products);
      } else {
        navigate("/page-not-found");
      }
    });
  };

  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    setCurrentUser(JSON.parse(cookie));
  };

  const addProductModalToggle = () => {
    setAddProductModaloOpen(!addProductModalOpen);
  };

  const getProductData = (data) => {
    AddProducts.postApi(data, (res) => {
      if (res && res.status === "SUCCESS") {
        toast("Successfully product is added");
        getCoconutData(setState);
        setAddProductModaloOpen();
      }
    });
  };

  const getInterValTime = (time) => {
    setTime(time);
  };

  if (time && Math.sign(time) === -1) {
    getCoconutData(setState);
  }

  return (
    <Fragment>
      <NavBar />
      <ToastContainer />
      {currentUser.role === PRODUCER ? (
        <Container>
          <Row className="mt-3 ">
            <Col
              xs={{ span: 6, offset: 6 }}
              sm={{ span: 8, offset: 8 }}
              md={{ span: 10, offset: 10 }}
              lg={{ span: 12, offset: 12 }}
            >
              <Button variant="success" onClick={addProductModalToggle}>
                + Add Product
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
      <div className="coconut-cards">
        {state && state.length > 0 ? (
          <CowCard
            coconutData={state}
            currentUser={currentUser}
            getInterValTime={getInterValTime}
          />
        ) : (
          <NoRecordsFound
            message="No Bid Yet"
            description={`${currentUser.role === PRODUCER ? "Add Bid Now" : "Wait until the producer submits a Bid."} `} />
        )}
      </div>
      <ProductAddModal
        open={addProductModalOpen}
        toggle={addProductModalToggle}
        getProductData={(e) => getProductData(e)}
      />
    </Fragment>
  );
};

export default DashboardPage;
