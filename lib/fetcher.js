import axios from "axios";

const baseURL = process.env.ESIGN_URL;
const username = process.env.ESIGN_USERNAME;
const password = process.env.ESIGN_PASSWORD;
const header = Buffer.from(`${username}:${password}`).toString("base64");

const bsreFetcher = axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${header}`,
  },
});

export default bsreFetcher;
