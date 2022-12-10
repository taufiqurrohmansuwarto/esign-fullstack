import { createRouter } from "next-connect";
import { index } from "../../../controllers/users.controller";

const router = createRouter();

router.get(index);

export default router.handler();
