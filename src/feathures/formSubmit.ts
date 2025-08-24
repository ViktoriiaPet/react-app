import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  age: number;
  sex: string;
  password: string;
  passwordRepit: string;
  terms: boolean;
  image: Base64URLString;
  country: string;
};

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

const formSubmitSlice = createSlice({
  name: "formSubmit",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = formSubmitSlice.actions;
export default formSubmitSlice.reducer;
