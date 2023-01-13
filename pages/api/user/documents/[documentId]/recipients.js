import { recipientsIndex } from "@/controllers/recipients.controller";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).get(recipientsIndex);

export default router.handler();
