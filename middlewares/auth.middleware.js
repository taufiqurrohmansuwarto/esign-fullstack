const Minio = require("minio");

import { unstable_getServerSession } from "next-auth";
import { options } from "pages/api/auth/[...nextauth]";

const port = process.env.MINIO_PORT;
const endPoint = process.env.MINIO_ENDPOINT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;
const nik = process.env.NIK;

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
      // const session = await unstable_getServerSession(req, res, options);
      const session = {
        user: {
          nik,
        },
      };
      if (session) {
        req.mc = mc;
        req.user = session;
        next();
      } else {
        // sending with header 401
        res
          .status(401)
          .send({ error: "Not authorized to access this resource" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  };

module.exports = auth;
