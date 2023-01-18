import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import {
  approveSign,
  rejectSign,
} from "@/controllers/request-from-others-recipients.controller";

const router = createRouter();

// patch di acc baik itu sign atau review
router.use(auth()).patch(approveSign).delete(rejectSign);
