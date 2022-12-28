import { createRouter } from "next-connect";
import multer from "multer";
import { documentUpload } from "@/controllers/users-upload.controller";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.use().post(multer().single("document"), documentUpload);

export default router.handler();
