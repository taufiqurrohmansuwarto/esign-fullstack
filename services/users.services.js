import axios from "axios";

const baseURL = "/api/users";

const fetcher = axios.create({
  baseURL,
});

export const check = () => {
  return fetcher.get("/check");
};
