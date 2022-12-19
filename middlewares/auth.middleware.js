const Minio = require("minio");

const port = process.env.MINIO_PORT;
const endPoint = process.env.MINIO_ENDPOINT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;

const mc = Minio.Client({
  endPoint,
  useSSL: true,
  port,
  accessKey,
  secretKey,
});

const auth =
  (group = "USER") =>
  async (req, res, next) => {
    try {
      req.mc = mc;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  };

module.exports = auth;
