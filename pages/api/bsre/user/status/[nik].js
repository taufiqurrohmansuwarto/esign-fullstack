import { createRouter } from "next-connect";
import { checkNikController } from "@/controllers/bsre-user.controller";

const router = createRouter();

router.get(checkNikController);

export default router.handler();
