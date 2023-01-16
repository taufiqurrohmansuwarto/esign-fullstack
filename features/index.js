import { configureStore } from "@reduxjs/toolkit";

import selfSignReducer from "../features/self-sign.slice";
import requestFromOthersReducer from "../features/request-from-others.slice";

export default configureStore({
  reducer: {
    selfSign: selfSignReducer,
    requestFromOthers: requestFromOthersReducer,
  },
});
