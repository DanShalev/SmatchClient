import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
   name: "profiles",
   initialState: {
     profiles: {},
   },
    reducers: {
      updateProfiles(state, action) {
        let currentProfiles = {};
        for (let [groupId, profilesList] of Object.entries(action.payload.profiles)) {
          currentProfiles[groupId] = [];
          for (let profile of profilesList) {
            currentProfiles[groupId].push({
              id: profile.id,
              name: profile.name,
              sex: profile.sex,
              age: profile.age,
              pushNotificationToken: profile.pushNotificationToken,
              pictures: [profile.image1, profile.image2, profile.image3],
            });
          }
        }
        state.profiles = currentProfiles;
      },

      removeFirstProfile(state, action) {
        state.profiles[action.payload.currentGroupId] = state.profiles[action.payload.currentGroupId].slice(1);
      }
    }
});

export const { updateProfiles, removeFirstProfile } = profilesSlice.actions;
export const selectProfiles = state => state.profiles.profiles;
export default profilesSlice.reducer;
