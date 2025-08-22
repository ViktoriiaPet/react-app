import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  age: number;
  sex: string;
  password: string;
  terms:boolean;
  image:Base64URLString;
  contry: string;
};

const initialState: UserState = {
  name: "",
  email: "",
  age: 0,
  sex:"",
  password:"",
  terms: false,
  image: "",
  contry: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.age= action.payload.age;
      state.sex= action.payload.sex;
      state.password = action.payload.password;
      state.terms = action.payload.terms;
      state.image = action.payload.image;
      state.contry = action.payload.contry

    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
