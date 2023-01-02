// digunakan untuk melihat stempel dia sendiri
import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import { index } from "@/controllers/stamp.controller";

const router = createRouter();

router.use(auth()).get(index);

export default router.handler();
