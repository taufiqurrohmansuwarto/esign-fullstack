import auth from "@/middlewares/auth.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

// fucking shit
router.use(auth("testing")).patch();

export default router.handler();
