import { getReportController } from "@/controllers/bsre-entity.controller";
import { createRouter } from "next-connect";
const router = createRouter();

router.get(getReportController);

export default router.handler();
