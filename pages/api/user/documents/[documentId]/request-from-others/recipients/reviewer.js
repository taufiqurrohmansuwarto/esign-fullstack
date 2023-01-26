import {
  approveReview,
  rejectReview,
} from "@/controllers/request-from-others-recipients.controller";
import checkSequenceMiddleware from "@/middlewares/request-from-others/check-sequence.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

import auth from "@/middlewares/auth.middleware";

// di terima dan di tolak
router
  .use(auth())
  .put(checkSequenceMiddleware("REVIEWER"), approveReview)
  .patch(checkSequenceMiddleware("REVIEWER"), rejectReview);

export default router.handler();
