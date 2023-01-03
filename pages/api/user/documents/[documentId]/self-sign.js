import { confirmSelfSign } from "@/controllers/sign.controller";
import auth from "@/middlewares/auth.middleware";
import {
  validate,
  validator,
} from "@/middlewares/self_sign_validator.middleware";
import { createRouter } from "next-connect";
const router = createRouter();

router.use(auth("testing")).patch(...validator, validate, confirmSelfSign);

export default router.handler();
