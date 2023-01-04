import auth from "@/middlewares/auth.middleware";
import { CheckAndReturnMiddleware } from "@/middlewares/self-sign/check_and_return_document.middleware";
import { downloadAndStamp } from "@/middlewares/self-sign/download_and_stamp.middleware";
import { signMiddleware } from "@/middlewares/self-sign/sign.middleware";
import {
  validate,
  validator,
} from "@/middlewares/self_sign_validator.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

router
  .use(auth("testing"))
  .patch(
    ...validator,
    validate,
    CheckAndReturnMiddleware,
    downloadAndStamp,
    signMiddleware,
    (req, res) => {
      console.log(req?.signDocument);
      res.json({ code: "message ok" });
    }
  );

export default router.handler();
