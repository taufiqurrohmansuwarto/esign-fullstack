import auth from "@/middlewares/auth.middleware";
import checkSequenceMiddleware from "@/middlewares/request-from-others/check-sequence.middleware";
import createStampMiddleware from "@/middlewares/request-from-others/signs/create-stamp.middleware";
import serializeMiddlware from "@/middlewares/request-from-others/signs/serialize.middleware";
import signBsreMiddleware from "@/middlewares/request-from-others/signs/sign-bsre.middleware";
import inserDatabaseMiddleware from "@/middlewares/request-from-others/signs/insert-database.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

// role harus signer dan status harus pending
router
  .use(auth())
  .put(
    checkSequenceMiddleware("SIGNER"),
    serializeMiddlware,
    createStampMiddleware,
    signBsreMiddleware,
    inserDatabaseMiddleware,
    async (req, res) => {
      res.json({ code: 200, message: "test" });
    }
  )
  .delete(checkSequenceMiddleware("SIGNER"));

export default router.handler();
