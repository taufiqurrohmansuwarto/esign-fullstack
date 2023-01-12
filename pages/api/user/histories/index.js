import { createRouter } from "next-connect";
import { index } from "@/controllers/histories.controller";
import auth from "@/middlewares/auth.middleware";
const router = createRouter();

router.use(auth()).get(index);

export default router.handler();
