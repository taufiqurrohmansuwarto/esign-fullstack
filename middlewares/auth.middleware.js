const Minio = require("minio");

import { getSession } from "next-auth/react";
import axios from "axios";

const port = process.env.MINIO_PORT;
const endPoint = process.env.MINIO_ENDPOINT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;

const mc = new Minio.Client({
  endPoint,
  useSSL: true,
  port: parseInt(port),
  accessKey,
  secretKey,
});

const auth =
  (group = "USER") =>
  async (req, res, next) => {
    try {
      // fucking lame
      if (group === "testing") {
        req.mc = mc;
        req.user = {
          id: "master|56543",
        };
        next();
      } else {
        const session = await getSession({ req });
        if (session) {
          const token = session?.accessToken;
          const fetcher = axios.create({
            baseURL: process.env.API_GATEWAY,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          req.mc = mc;
          req.user = session?.user;
          req.fetcher = fetcher;

          next();
        } else {
          // sending with header 401
          res
            .status(401)
            .send({ error: "Not authorized to access this resource" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  };

module.exports = auth;
