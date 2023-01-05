import { createRouter } from "next-connect";
const router = createRouter();
import auth from "@/middlewares/auth.middleware";
import { beforeInsertMiddleware } from "@/middlewares/request-from-others/before-insert-recipients.middleware";
import { post } from "@/controllers/recipients.controller";

router.use(auth("testing")).post(beforeInsertMiddleware, post);

export default router.handler();
