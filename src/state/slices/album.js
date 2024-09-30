import { createSlice } from "@reduxjs/toolkit";
import UseInitialStates from "@hooks/use-initial-state";
import {
  getAlbumItems,
  getAlbumItem,
  updateAlbumItem,
  deleteAlbum,
  addAlbumItem,
} from "@state/act/actAlbums";

const { initalStateAlbumItems } = UseInitialStates(); // Fixed typo

export const albumSlice = createSlice({
  name: "albumSlice",
  initialState: initalStateAlbumItems,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumItems.pending, (state, action) => {
        state.loadingGetAlbumItems = true;
      })
      .addCase(getAlbumItems.fulfilled, (state, action) => {
        state.albumItems = action.payload.album_items;
        state.loadingGetAlbumItems = false;
        state.countOfAlbumItems = action.payload.album_items.length;
      })
      .addCase(getAlbumItems.rejected, (state, action) => {
        state.loadingGetAlbumItems = false;
      })
      .addCase(deleteAlbum.pending, (state, action) => {
        state.loadingDeleteAlbumItem = true; // Fix the typo here
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.loadingDeleteAlbumItem = false;
        state.countOfAlbumItems--;
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.loadingDeleteAlbumItem = false;
      })
      .addCase(addAlbumItem.pending, (state, action) => {
        state.loadingAddAlbumItem = true; // Fix the typo here
      })
      .addCase(addAlbumItem.fulfilled, (state, action) => {
        state.loadingAddAlbumItem = false;
      })
      .addCase(addAlbumItem.rejected, (state, action) => {
        state.loadingAddAlbumItem = false;
      })
      .addCase(getAlbumItem.pending, (state) => {
        state.loadingSpecifiedAlbumItem = true; // Fix the typo here
      })
      .addCase(getAlbumItem.fulfilled, (state, action) => {
        state.loadingSpecifiedAlbumItem = false;
        state.imgUrl = action.payload.url;
        state.imgIsCover = action.payload.is_cover;
      })
      .addCase(getAlbumItem.rejected, (state, action) => {
        state.loadingSpecifiedAlbumItem = false;
      });
  },
});
export default albumSlice.reducer;
export {
  getAlbumItems,
  getAlbumItem,
  updateAlbumItem,
  deleteAlbum,
  addAlbumItem,
};
