import { configureStore } from "@reduxjs/toolkit";

import requestFromOthersViewReducer from "../features/request-from-others-view.slice";
import requestFromOthersReducer from "../features/request-from-others.slice";
import selfSignReducer from "../features/self-sign.slice";

export default configureStore({
  reducer: {
    selfSign: selfSignReducer,
    requestFromOthers: requestFromOthersReducer,
    requestFromOthersView: requestFromOthersViewReducer,
  },
});
