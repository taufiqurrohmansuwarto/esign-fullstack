import {
  approveSign,
  rejectSign,
} from "@/controllers/request-from-others-recipients.controller";
import checkSequenceMiddleware from "@/middlewares/request-from-others/check-sequence.middleware";
import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

// role harus signer dan status harus pending
router
  .use(auth())
  .put(checkSequenceMiddleware("SIGNER"), approveSign)
  .delete(checkSequenceMiddleware("SIGNER"), rejectSign);

export default router.handler();
