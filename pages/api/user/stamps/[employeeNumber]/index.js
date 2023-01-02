import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import { get } from "@/controllers/stamp.controller";
const router = createRouter();

router.use(auth()).get(get);

export default router.handler();
