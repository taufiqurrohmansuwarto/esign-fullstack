import { confirmSelfSign } from "@/controllers/sign.controller";
import auth from "@/middlewares/auth.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

// fucking shit
router.use(auth("testing")).patch(confirmSelfSign);

export default router.handler();
