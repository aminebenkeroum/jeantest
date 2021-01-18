import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Login error? token?");
    }
    return Promise.reject(error);
  }
);

export default axios;
