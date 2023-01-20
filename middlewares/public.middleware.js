const Minio = require("minio");

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

const publicMiddleware = async (req, res, next) => {
  req.mc = mc;
  next();
};

module.exports = publicMiddleware;
