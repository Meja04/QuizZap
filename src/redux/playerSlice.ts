import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  name: string;
}

const initialState: PlayerState = {
  name: localStorage.getItem("playerName") || "", // prende il nome dal local storage se c'è già oppure setta stringa vuota
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
