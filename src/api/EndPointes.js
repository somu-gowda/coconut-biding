const REACT_APP_API_URL = "https://f7d8-36-255-87-126.in.ngrok.io/api";

const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  // User API Routes
  userAPI: appApi("v1/users"),
  userLogin: appApi("v1/login"),
  productAPI: appApi("v1/products"),
  walletAPI: appApi("v1/users"),
});
