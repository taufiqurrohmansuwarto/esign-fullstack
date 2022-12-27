import axios from "axios";

const baseURL = "/api/fasilitators";

const fetcher = axios.create({
  baseURL,
});

export const getFasilitators = () => {
  return fetcher.get("/");
};
