import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  currentPage: number;
  numPages: number;
}

const initialState: PageState = {
  currentPage: 1,
  numPages: 0,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setNumPages: (state, action: PayloadAction<number>) => {
      state.numPages = action.payload;
    },
    nextPage: (state) => {
      if (state.currentPage < state.numPages) {
        state.currentPage += 1;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
});

export const { setPage, setNumPages, nextPage, prevPage } = pageSlice.actions;
export default pageSlice.reducer;
