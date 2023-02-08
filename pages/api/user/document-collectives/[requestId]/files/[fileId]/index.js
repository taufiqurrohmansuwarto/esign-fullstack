const { createRouter } = require("next-connect");
import {
  detail,
  remove,
  update,
} from "@/controllers/documents-collectives-files";
import auth from "@/middlewares/auth";

const router = createRouter();

router.use(auth()).get(detail).patch(remove).delete(update);

export default router.handler();
