import auth from "@/middlewares/auth.middleware";
import checkSequenceMiddleware from "@/middlewares/request-from-others/check-sequence.middleware";
import createStampMiddleware from "@/middlewares/request-from-others/signs/create-stamp.middleware";
import serializeMiddlware from "@/middlewares/request-from-others/signs/serialize.middleware";
import signBsreMiddleware from "@/middlewares/request-from-others/signs/sign-bsre.middleware";
import inserDatabaseMiddleware from "@/middlewares/request-from-others/signs/insert-database.middleware";

// reject sign
import rejectSignSerializeMiddleware from "@/middlewares/request-from-others/signs/reject-sign-serialize.middleware";
import createStampRejectSignMiddleware from "@/middlewares/request-from-others/signs/create-stamp-reject-sign.middleware";

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
    async () => {
      res.json({ code: 200, message: "test" });
    }
  )
  .delete(
    checkSequenceMiddleware("SIGNER"),
    rejectSignSerializeMiddleware,
    createStampRejectSignMiddleware,
    async (req, res) => {
      console.log(req.rejectedDocument);

      res.json({ code: 200, message: "test" });
    }
  );

export default router.handler();
