import { createRouter } from "next-connect";
import multer from "multer";
import { verifyDocumentController } from "@/controllers/bsre-sign.controller";
export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();
router.post(multer().single("document"), verifyDocumentController);

export default router.handler();
