import React, { Fragment, useEffect, useState } from "react";
import CowCard from "../card/Card";
import NavBar from "../Layouts/NavBar";
import "./DashboardPage.css";
import { Button, Container, Row } from "react-bootstrap";
import WebCookies from "../../components/common/Cookies/cookies";
import ProductAddModal from "../modal/ProductAddModal";
import AddProducts from "../modal/ProductAddApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PRODUCER = "PRODUCER";

const DashboardPage = () => {
  const [state, setState] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [addProductModalOpen, setAddProductModaloOpen] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    getUserInCookie();
    getCoconutData(setState);
  }, []);

  const getCoconutData = (setState) => {
    AddProducts.getApi((res) => {
      if(res){
        setState(res.data.products);
      } else {
        navigate("/page-not-found");
      }
    })
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

  return (
    <Fragment>
      <NavBar />
      <ToastContainer />
      {currentUser.role === PRODUCER ? (
        <Container className="align-items-end">
          <Row className="mt-3">
            <Button variant="success" onClick={addProductModalToggle}>
              + Add Product
            </Button>
          </Row>
        </Container>
      ) : (
        ""
      )}
      <div className="coconut-cards">
        <CowCard coconutData={state} />
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
