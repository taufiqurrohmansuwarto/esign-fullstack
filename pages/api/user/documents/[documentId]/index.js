import { deleteDocument } from "@/controllers/user-document.controller";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(auth())
  .get((req, res) => res.json({ message: "ok" }))
  .delete(deleteDocument);

export default router.handler();
