import { getExpiredCertController } from "@/controllers/bsre-entity.controller";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getExpiredCertController);

export default router.handler();
