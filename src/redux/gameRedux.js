import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "users",
  initialState: {
    playerOne: {
      isReady: null,
      name: "",
      placedShipsCoords: [],
      sunkedShipsCoords: [],
      fires: {
        missedFires: [],
        successFires: [],
        successSinks: [],
      },
    },
    playerTwo: {
      isReady: null,
      name: "",
      placedShipsCoords: [],
      sunkedShipsCoords: [],
      fires: {
        missedFires: [],
        successFires: [],
        successSinks: [],
      },
    },
    gameStarted: false,
    gameStep: 0,
    selectedShip: "",
    filledAreas: [],
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
      if (state.gameStep > 0) {
        state.gameStep -= 1;
      }
    },
    setSelectedShip: (state, action) => {
      state.selectedShip = action.payload;
    },
    setFilledAreas: (state, action) => {
      const itemIndex = state.filledAreas?.findIndex(
        (filledArea) => filledArea === action.payload
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.filledAreas?.push(action.payload);
        state.playerOne.fires?.missedFires.push(action.payload);
      } else return;
    },
  },
});

export const {
  setPlayerOneName,
  setPlayerTwoName,
  increaseGameStep,
  decreaseGameStep,
  setSelectedShip,
  setFilledAreas,
} = gameSlice.actions;

export default gameSlice.reducer;
