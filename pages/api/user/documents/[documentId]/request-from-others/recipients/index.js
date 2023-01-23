import { post } from "@/controllers/recipients.controller";
import auth from "@/middlewares/auth.middleware";
import { beforeInsertMiddleware } from "@/middlewares/request-from-others/before-insert-recipients.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

// accept the motherfcker request from othres
router.use(auth()).post(beforeInsertMiddleware, post);

export default router.handler();
