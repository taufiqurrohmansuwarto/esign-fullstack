import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";
import multer from "multer";

const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

// using multer to upload file
router.use(auth).post(multer().single("document"));

export default router.handler();
