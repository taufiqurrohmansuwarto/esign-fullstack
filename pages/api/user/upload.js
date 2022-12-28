import { createRouter } from "next-connect";
import multer from "multer";
import { documentUpload } from "@/controllers/users-upload.controller";
import auth from "../../../middlewares/auth.middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.use(auth()).post(multer().single("file"), documentUpload);

export default router.handler();
