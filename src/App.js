import { Fragment } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

// components
import LoginForm from "./components/LoginPages/LoginForm";
import Registration from "./components/LoginPages/Registration";
import Page404 from "./components/Page404";
import DashboardPage from "./components/dashboard/DashboardPage";
import BidDetail from "./components/dashboard/bidDetails/BidDetail";

// Page roots
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/details/:id",
    element: <BidDetail />,
  },
  {
    path: "/page-not-found",
    element: <Page404 />,
  },
]);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
