import { createRouter } from "next-connect";
import { verifyDocumentController } from "@/controllers/bsre-sign.controller";
import multer from "multer";

const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(multer().single("document"), verifyDocumentController);

export default router.handler();
