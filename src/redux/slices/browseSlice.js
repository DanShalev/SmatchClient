import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const browseSlice = createSlice({
   name: "browse",
   initialState: {
     browseGroups: {},
     categories: {},
   },
    reducers: {
      updateBrowseGroups(state, action) {
        state.browseGroups = action.payload.browseGroups;
      },

      updateCategories(state, action) {
        state.categories = action.payload.categories;
      }
    }
});

export const { updateBrowseGroups, updateCategories } = browseSlice.actions;
export const selectBrowseGroups = state => state.browse.browseGroups;
export const selectCategories = state => state.browse.categories;
export default browseSlice.reducer;
