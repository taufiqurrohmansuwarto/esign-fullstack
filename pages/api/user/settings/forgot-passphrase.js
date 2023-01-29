import auth from '@/controllers/auth.controller';
import { createRouter } from 'next-connect';
import {changePasswordController} from '@/controllers/user-document.controller'
const router = createRouter;

router.use(auth()).post(changePasswordController);

export default router.handler();