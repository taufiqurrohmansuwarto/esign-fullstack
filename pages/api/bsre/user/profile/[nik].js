import { createRouter } from "next-connect";
import { getProfileController } from "@/controllers/bsre-user.controller";

const router = createRouter();

router.get(getProfileController);

export default router.handler();
