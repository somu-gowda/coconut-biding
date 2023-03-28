import * as React from "react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import LogOutModal from "../modal/LogoutModal";
import WalletModal from "../modal/wallet/WalletModal";
import WebCookies from "../../components/common/Cookies/cookies";
import { useNavigate, useLocation } from "react-router-dom";
import WalletAPI from "../modal/wallet/WalletApi";
import { ToastContainer, toast } from "react-toastify";
import {Button, FormGroup, FormLabel, FormSelect, FormText, Nav, Navbar} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import RegisterApi from "../LoginPages/RegisterApi";
import Products from "../modal/ProductAddApi";
import {useEffect} from "react";
import {Input} from "@mui/material";
import "./NavBar.css"

// constants
const CONSUMER = "CONSUMER";

const NavBar = (props) => {
  const { getCurrentUser, getWalletDetails } = props;
  // state
  const [openLogoutModal, setLogoutModal] = React.useState(false);
  const [openWalletModal, setWalletModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [walletDetails, setWalletDetails] = React.useState("");
  const [complaintBox, setComplaintBox] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [productsList, setProductsList] = React.useState([]);
  const CONSUMER = "CONSUMER";

  useEffect(() => {
    getUsersList();
  }, [])

  // toggle logout modal
  const handleLogoutClose = () => setLogoutModal(false);
  const handleLogoutopen = () => setLogoutModal(true);

  // toggle wallet modal
  const handleWalletClose = () => setWalletModal(false);
  const handleWalletopen = () => setWalletModal(true);
  const openComplaintBox = () => {
    setComplaintBox(true)
  };
  const closeComplaintBox = () => {
    setComplaintBox(false)
  };

  // handle loggout modal
  const logoutToggle = (data) => {
    if (data === "logout") {
      handleLogoutopen();
    } else {
      handleWalletopen();
    }
  };

  // Navigation hook
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate(`/`);
  };

  React.useEffect(() => {
    getUserInCookie();
  }, []);

  // Wallet API
  const getWallDeatil = (userName, callBack) => {
    WalletAPI.getApi(userName, callBack);
    getWalletDetails && getWalletDetails(walletDetails);
  };

  // post wallet amount
  const AddWallAmount = (data) => {
    WalletAPI.postApi(data, (response) => {
      if (response.status === "SUCCESS") {
        toast("Successfull");
      }
      getWallDeatil(data.wallet.userName, setWalletDetails);
      handleWalletClose();
    });
  };

  // get user cookies
  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    getCurrentUser && getCurrentUser(JSON.parse(cookie));
    setCurrentUser(JSON.parse(cookie));
    if (cookie) {
      getWallDeatil(JSON.parse(cookie).userName, setWalletDetails);
    }
  };

  // logout function
  const logOutFun = () => {
    WebCookies.RemoveCookie("userin");
    WebCookies.RemoveCookie("bidId");
    handleNavigation();
  };

  const logoutModal = (data, callBack) => {
    callBack(data);
  };
  const setUsersList = (res) => {
    setUserList(res.data.users);
  }
  const getUsersList = () => {
    const role = currentUser.role === 'CONSUMER' ? 'PRODUCER' : 'CONSUMER'; 
    let qParams = 'role=' + role;
    RegisterApi.getUsersListApi(setUsersList, qParams);
  };



  const createUserSelect = () =>  {
    let optionList = userList.length > 0 && userList.map((item, i) => {
      return <option key={i} value={item._id}>{item.userName}</option>
    }, this);
    return optionList;
  }

  const createProductSelect = () =>  {
    let optionList = productsList.length > 0 && productsList.map((item, i) => {
      return <option key={i} value={item._id}>{item.name}</option>
    }, this);
    return optionList;
  }
  const setProductsListss = (e) => {
    if(e.status === "SUCCESS") {
      console.log(e)
      console.log(e.data.products)
      setProductsList(e.data.products)
      console.log(productsList)
    }
  }
  const handleUserSelection = (event) =>  {
    console.log(event.target.value)
    let qParams = '?userId=' + event.target.value;
    Products.getApiCustomList(setProductsListss, qParams)
  }

  return (
    <React.Fragment>
      <ToastContainer />
      {currentUser.role === CONSUMER}
      <WalletModal
        currentUser={currentUser}
        open={openWalletModal}
        walletDetails={walletDetails}
        walletAmount={
          walletDetails.data &&
          walletDetails.data.wallet &&
          walletDetails.data.wallet.amount
        }
        handleClose={handleWalletClose}
        AddWallAmount={(e) => AddWallAmount(e)}
      />
      <LogOutModal
        open={openLogoutModal}
        handleClose={handleLogoutClose}
        logOutFun={logOutFun}
      />

      <Modal show={complaintBox} onHide={closeComplaintBox} className="shadow">
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center h5" >

          <FormGroup style={{ display: 'flex', justifyContent: "space-between"}}>
            <FormLabel style={{flex: 1}}> Select user </FormLabel>
            <FormSelect
                style={{flex: 2}}
                name="role"
                type="select"
                required
                onChange={handleUserSelection}
            >
              {createUserSelect()}
            </FormSelect>
          </FormGroup>

          <FormGroup style={{ display: 'flex', justifyContent: "space-between"}}>
            <FormLabel style={{flex: 1}}> Select Product </FormLabel>
            <FormSelect
                style={{flex: 2}}
                name="role"
                type="select"
                required
                onChange={handleUserSelection}
            >
              {createProductSelect()}
            </FormSelect>
          </FormGroup>
          <Input className="complaintTextBox" type="text"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={closeComplaintBox}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="/products" style={{ marginLeft: "50px" }}>
          Coconut Bid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/products"
              active={location?.pathname === "/products"}
            >
              Products
            </Nav.Link>
            {currentUser?.role === "ADMIN" && (
              <Nav.Link href="/users" active={location?.pathname === "/users"}>
                Users
              </Nav.Link>
            )}

            {currentUser?.role === "ADMIN" && (
              <Nav.Link href="/user-complaints" active={location?.pathname === "/user-complaints"}>
                Complaints
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link>
              <Button
                  variant="outline-light"
                  style={{ marginRight: "25px", fontSize: "large" }}
                  onClick={openComplaintBox}>
                Raise Complaint
              </Button>
            </Nav.Link>
            <Nav.Link>
              <span style={{ marginRight: "25px", fontSize: "large" }}>
                {currentUser?.userName}
              </span>
            </Nav.Link>
            {currentUser?.role === CONSUMER && (
              <Nav.Link eventKey={2}>
                <span onClick={() => logoutModal("wallet", logoutToggle)}>
                  <abbr title="Wallet">
                    <FaWallet
                      style={{
                        color: "white",
                        width: "35px",
                        height: "25px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </abbr>
                </span>
              </Nav.Link>
            )}
            <Nav.Link eventKey={2}>
              <span onClick={() => logoutModal("logout", logoutToggle)}>
                <abbr title="logout">
                  <FaSignOutAlt
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                  />
                </abbr>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};
export default NavBar;
