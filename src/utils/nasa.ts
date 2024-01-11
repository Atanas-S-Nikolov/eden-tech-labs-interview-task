import axios from "axios"
import { NASA_URL } from "./EndpointsUtils";

const nasaRequest = axios.create({
  baseURL: NASA_URL,
  params: {
    api_key: import.meta.env.VITE_NASA_API_KEY
  }
});

export default nasaRequest;
