import axios from "axios";

export default axios.create({
  baseURL:
    (process.env.REACT_APP_BACKEND_URL as string) || "http://localhost:8070",

  withCredentials: true,
});
