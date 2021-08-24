import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
     authCredentials: {
       isCurrentlyAuthenticated: false, // Updating this will cause AuthNavigator to re-render, and display different pages
       facebook_id: null
     },
     currentUserData: {}
   },
    reducers: {
      logOut(state, action) {
        state.authCredentials.isCurrentlyAuthenticated = false;
        state.authCredentials.facebook_id = null;
      },
      logIn(state, action) {
        state.authCredentials.isCurrentlyAuthenticated = true;
        state.authCredentials.facebook_id = action.payload.facebook_id;
      },
      setCurrentUserData(state, action) {
        state.currentUserData = {
          fb_token: action.payload.fb_token,
          id: action.payload.facebook_id,
          name: action.payload.name,
          age: action.payload.age,
          gender: action.payload.gender,
          pictures: action.payload.pictures,
        }
      },
      setCurrentUserPictures(state, action) {
        if (state.currentUserData) {
          state.currentUserData.pictures = action.payload.pictures;
        }
      }
    }
});

export const { logIn, logOut, setCurrentUserData, setCurrentUserPictures } = authSlice.actions;
export const selectIsAuthenticated = state => state.auth.authCredentials.isCurrentlyAuthenticated;
export const selectUserFacebookId = state => state.auth.authCredentials.facebook_id;
export const selectCurrentUserData = state => state.auth.currentUserData;
export default authSlice.reducer;
