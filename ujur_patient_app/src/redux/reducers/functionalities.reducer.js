/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const functionalitiesSlice = createSlice({
  name: "functionalities",
  initialState: {
    functionalities: {
        showNavbar: false,
        token: false,
        userProfile:{

        }
    },

  },
  reducers: {
    updateNavbar(state) {
      state.functionalities.showNavbar = !state.functionalities.showNavbar
    },
    updateToken(state, payload) {
      state.functionalities.token = payload.payload
    },
    updateUser(state, payload) {
      state.functionalities.userProfile = payload.payload
    },
    clearRedux(state) {
      state.functionalities = {
        showNavbar: false,
        token: false,
        userProfile: false
    }
    },


  },
});

export const { updateNavbar, updateToken, clearRedux, updateUser } = functionalitiesSlice.actions;

export const functionalitiesNavbar = state => state.loader.functionalities.showNavbar;
export const tokenJson = state => state.loader.functionalities.token;
export const userData = state => state.loader.functionalities.userProfile;

export default functionalitiesSlice.reducer;
