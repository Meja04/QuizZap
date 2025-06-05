import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  name: string;
}

const initialState: PlayerState = {
  name: localStorage.getItem("playerName") || "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      localStorage.setItem("playerName", action.payload);
    },
  },
});

export const { setPlayerName } = playerSlice.actions;
export default playerSlice.reducer;
