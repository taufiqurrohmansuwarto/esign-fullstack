import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
const router = createRouter();
import { checkingUploadMiddleware } from "@/middlewares/upload.middleware";

import multer from "multer";
import { selfSignUploadController } from "@/controllers/users-upload.controller";

export const config = {
  api: {
    bodyParser: false,
  },
};

// first use middleware to check file

router
  .use(auth())
  .post(
    multer().single("file"),
    checkingUploadMiddleware("selfSign"),
    selfSignUploadController
  );

export default router.handler();
