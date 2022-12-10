import axios from "axios";

const userFetcher = axios.create({
  baseURL: "/api/user",
});

export const getUsers = async () => {
  const { data } = await userFetcher.get("/");
  return data;
};
