import * as React from "react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import LogOutModal from "../modal/LogoutModal";
import WalletModal from "../modal/wallet/WalletModal";
import WebCookies from "../../components/common/Cookies/cookies";
import { useNavigate, useLocation } from "react-router-dom";
import WalletAPI from "../modal/wallet/WalletApi";
import { ToastContainer, toast } from "react-toastify";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = (props) => {
  const { getCurrentUser, getWalletDetails } = props;
  // state
  const [openLogoutModal, setLogoutModal] = React.useState(false);
  const [openWalletModal, setWalletModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [walletDetails, setWalletDetails] = React.useState("");
  const CONSUMER = "CONSUMER";

  console.log(currentUser);

  // toggle logout modal
  const handleLogoutClose = () => setLogoutModal(false);
  const handleLogoutopen = () => setLogoutModal(true);

  // toggle wallet modal
  const handleWalletClose = () => setWalletModal(false);
  const handleWalletopen = () => setWalletModal(true);

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
      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="/dashboard" style={{ marginLeft: "50px" }}>
          Coconut Bid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products" active={location?.pathname === "/products"}>Products</Nav.Link>
            {currentUser?.role === "ADMIN" && (
              <Nav.Link href="/users" active={location?.pathname === "/users"}>Users</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link>
              <span style={{ marginRight: "25px", fontSize: "large" }}>
                {currentUser?.userName}
              </span>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              {currentUser?.role === CONSUMER && (
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
              )}
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
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
