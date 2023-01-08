import { createRouter } from "next-connect";
import auth from "@/middlewares/auth";
const router = createRouter();

router.use(auth()).get();

export default router.handler();
