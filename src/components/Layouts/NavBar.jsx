import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import LogOutModal from "../modal/LogoutModal";
import WalletModal from "../modal/wallet/WalletModal";
import WebCookies from "../../components/common/Cookies/cookies";
import { useNavigate } from "react-router-dom";
import WalletAPI from "../modal/wallet/WalletApi";
import { ToastContainer, toast } from "react-toastify";

// Navbar items
function appBarLabel(label, currentUser, callBack) {
  const logoutModal = (data, callBack) => {
    callBack(data);
  };

  return (
    <Toolbar>
      <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      <span style={{ marginRight: "25px", fontSize: "large" }}>
        {currentUser?.userName}
      </span>
      <span onClick={() => logoutModal("wallet", callBack)}>
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
      <span onClick={() => logoutModal("logout", callBack)}>
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
    </Toolbar>
  );
}

// theme object
const darkTheme = createTheme({
  palette: {
    mode: "success",
    primary: {
      main: orange[500],
    },
  },
});

const NavBar = (props) => {
  const { getCurrentUser, getWalletDetails } = props;
  // state
  const [openLogoutModal, setLogoutModal] = React.useState(false);
  const [openWalletModal, setWalletModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [walletDetails, setWalletDetails] = React.useState("");

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

  const handleNavigation = () => {
    navigate("/");
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

  return (
    <React.Fragment>
      <ToastContainer />
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
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="success">
            {appBarLabel("Coconut Bid", currentUser, (data) => {
              logoutToggle(data);
            })}
          </AppBar>
        </ThemeProvider>
      </Stack>
    </React.Fragment>
  );
};
export default NavBar;
