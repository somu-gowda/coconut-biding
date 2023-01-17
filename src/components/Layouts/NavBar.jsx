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
import WalletModal from "../modal/WalletModal";
import WebCookies from "../../components/common/Cookies/cookies";
import { useNavigate } from "react-router-dom";

function appBarLabel(label, callBack) {
  const logoutModal = (data, callBack) => {
    callBack(data);
  };

  return (
    <Toolbar>
      <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      <span onClick={() => logoutModal("wallet", callBack)}>
        <abbr title="wallet">
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

const darkTheme = createTheme({
  palette: {
    mode: "success",
    primary: {
      main: orange[500],
    },
  },
});

const NavBar = () => {
  const [openLogoutModal, setLogoutModal] = React.useState(false);
  const [openWalletModal, setWalletModal] = React.useState(false);

  const handleLogoutClose = () => setLogoutModal(false);
  const handleLogoutopen = () => setLogoutModal(true);

  const handleWalletClose = () => setWalletModal(false);
  const handleWalletopen = () => setWalletModal(true);

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

  const logOutFun = () => {
    WebCookies.RemoveCookie("userin");
    handleNavigation();
  };

  return (
    <React.Fragment>
      <WalletModal open={openWalletModal} handleClose={handleWalletClose} />
      <LogOutModal
        open={openLogoutModal}
        handleClose={handleLogoutClose}
        logOutFun={logOutFun}
      />
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="success">
            {appBarLabel("Coconut Bid", (data) => {
              logoutToggle(data);
            })}
          </AppBar>
        </ThemeProvider>
      </Stack>
    </React.Fragment>
  );
};
export default NavBar;
