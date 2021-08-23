import axios from "axios";

const instance = axios.create({
  baseURL: Process.env.REACT_APP_API_URL,
});

export default instance;
