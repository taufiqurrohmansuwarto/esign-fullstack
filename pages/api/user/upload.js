import { createRouter } from "next-connect";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.use().post(multer().single("document"));

export default router.handler();
