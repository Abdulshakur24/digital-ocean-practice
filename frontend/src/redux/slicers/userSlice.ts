import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "src/utils/api";

export const updateProfileInfo = createAsyncThunk(
  "user/info",
  async (values: { fName: string; lName: string; email: string }) => {
    try {
      await api.put(`/user/info`, values);
    } catch (err) {
      console.error(err);
    }
    return;
  }
);

export const updateProfileStatus = createAsyncThunk(
  "user/status",
  async (status: string) => {
    try {
      await api.put(`/user/status`, { status });
    } catch (err) {
      console.error(err);
    }
    return;
  }
);

export const updateProfilePic = createAsyncThunk(
  "user/pic",
  async (formData: any) => {
    try {
      await api.put(`/user/pic`, formData);
    } catch (err) {
      console.error(err);
    }
    return;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = payload.user;
    },
    loadUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      api.defaults.headers.authorization = `Bearer ${payload.token}`;
    },
    logout: (state) => {
      state.user = null;
      api.defaults.headers.authorization = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
    });
  },
});

export const { loadUser, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
