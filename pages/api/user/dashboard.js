import { userDashboard } from "@/controllers/dashboard.controller";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).get(userDashboard);

export default router.handler();
