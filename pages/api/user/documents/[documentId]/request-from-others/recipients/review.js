import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import {
  approveReview,
  rejectReview,
} from "@/controllers/request-from-others-recipients.controller";
const router = createRouter();

router.use(auth()).patch(approveReview).delete(rejectReview);
