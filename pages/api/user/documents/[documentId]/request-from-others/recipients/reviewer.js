import { rejectReview } from "@/controllers/request-from-others-recipients.controller";
import checkSequenceMiddleware from "@/middlewares/request-from-others/check-sequence.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

import auth from "@/middlewares/auth.middleware";

import acceptReviewMiddleware from "@/middlewares/request-from-others/review/accept-review.middleware";
import rejectReviewSerialize from "@/middlewares/request-from-others/review/reject-review-serialize.middleware";
import createStampRejectSignMiddleware from "@/middlewares/request-from-others/signs/create-stamp-reject-sign.middleware";
import insertDatabaseRejectedMiddleware from "@/middlewares/request-from-others/signs/insert-database-rejected.middleware";

// di terima dan di tolak
router
  .use(auth())
  .put(
    checkSequenceMiddleware("REVIEWER"),
    acceptReviewMiddleware,
    async (req, res) => {
      res.json({ code: 200, message: "ok" });
    }
  )
  .patch(
    checkSequenceMiddleware("REVIEWER"),
    rejectReviewSerialize,
    createStampRejectSignMiddleware,
    insertDatabaseRejectedMiddleware,
    async (req, res) => {
      res.json({ code: 200, message: "ok" });
    }
  );

export default router.handler();
