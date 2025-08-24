import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feathures/formSubmit";
import countryReducer from "../feathures/countriesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
