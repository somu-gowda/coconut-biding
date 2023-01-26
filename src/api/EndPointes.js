const REACT_APP_API_URL = "https://3368-36-255-87-123.in.ngrok.io/api";

const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  // User API Routes
  userAPI: appApi("v1/users"),
  userLogin: appApi("v1/login"),
  productAPI: appApi("v1/products"),
});
