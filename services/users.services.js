// ini digunakan pada client menggunakan react-query

import axios from "axios";

const baseURL = "/esign/api/user";

const fetcher = axios.create({
  baseURL,
});

export const check = () => {
  return fetcher.get("/check");
};

export const detailUser = () => {
  return fetcher.get("/").then((res) => res?.data);
};

export const stampInfo = () => {
  return fetcher.get("/stamps").then((res) => res?.data);
};

export const stampInfoByEmployeeNumber = (employeeNumber) => {
  return fetcher.get(`/stamps/${employeeNumber}`).then((res) => res?.data);
};

export const listDocuments = (query) => {
  // object to qeury strign

  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher.get("/documents").then((res) => res?.data);
};
