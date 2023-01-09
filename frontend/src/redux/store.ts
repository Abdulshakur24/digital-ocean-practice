import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicers/userSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";

import storage from "reduxjs-toolkit-persist/lib/storage";

const rootReducer = combineReducers({
  userState: userReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 0.1,
    // blacklist: ["userState"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
