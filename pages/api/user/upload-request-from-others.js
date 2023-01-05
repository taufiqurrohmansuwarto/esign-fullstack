import auth from "@/middlewares/auth.middleware";
import { createRouter } from "next-connect";
import multer from "multer";
import { checkingUploadMiddleware } from "@/middlewares/upload.middleware";
import { requestFromOthersController } from "@/controllers/users-upload.controller";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router
  .use(auth("testing"))
  .post(
    multer().single("document"),
    checkingUploadMiddleware("requestFromOthers"),
    requestFromOthersController
  );

export default router.handler();
