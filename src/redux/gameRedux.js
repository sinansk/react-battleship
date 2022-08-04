import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "users",
  initialState: {
    playerOne: {
      isReady: null,
      name: "",
    },
    playerTwo: {
      isReady: null,
      name: "",
    },
    gameStarted: false,
    gameStep: 10,
  },

  reducers: {
    setPlayerOneName: (state, action) => {
      state.playerOne.name = action.payload;
    },
    setPlayerTwoName: (state, action) => {
      state.playerTwo.name = action.payload;
    },
    increaseGameStep: (state) => {
      state.gameStep += 1;
    },
    decreaseGameStep: (state) => {
      state.gameStep -= 1;
    },
  },
});

export const {
  setPlayerOneName,
  setPlayerTwoName,
  increaseGameStep,
  decreaseGameStep,
} = gameSlice.actions;

export default gameSlice.reducer;
