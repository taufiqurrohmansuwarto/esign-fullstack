import auth from "@/middlewares/auth.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

router.use(auth()).post();
