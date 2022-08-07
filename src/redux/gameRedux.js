import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "users",
  initialState: {
    playerOne: {
      isReady: null,
      name: "",
      placedShipsCoords: [
        ["11", "12", "13", "14"],
        ["34", "44", "54"],
      ],

      sunkedShipsCoords: [],
      fires: {
        allFires: [],
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
        allFires: [],
        missedFires: [],
        successFires: [],
        successSinks: [],
      },
    },
    activePlayer: "playerOne",
    activePlayerName: "",
    gameStarted: false,
    gameStep: 0,
    selectedShipLength: "",
    isShipSelected: false,
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
    setSelectedShipLength: (state, action) => {
      state.selectedShipLength = action.payload;
    },

    placePlayerOneShips: (state, action) => {
      const itemIndex = state.playerOne?.placedShipsCoords.findIndex(
        (placedShipsCoord) => placedShipsCoord === action.payload
      );

      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerOne?.placedShipsCoords?.push(action.payload);
      } else return;
    },
    placePlayerTwoShips: (state, action) => {
      const itemIndex = state.playerTwo?.placedShipsCoords.findIndex(
        (placedShipsCoord) => placedShipsCoord === action.payload
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerTwo?.placedShipsCoords?.push(action.payload);
      } else return;
    },
    playerOneFires: (state, action) => {
      const itemIndex = state.playerOne.fires?.allFires?.findIndex(
        (fire) => fire === action.payload
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerOne.fires?.allFires.push(action.payload);
        if (state.playerTwo.placedShipsCoords?.includes(action.payload)) {
          state.playerOne.fires?.successFires.push(action.payload);
          state.activePlayerName = state.playerOne.name;
          state.activePlayer = "playerOne";
        } else {
          state.playerOne.fires?.missedFires.push(action.payload);
          state.activePlayerName = state.playerTwo.name;
          state.activePlayer = "playerTwo";
        }
      } else return;
    },
    playerTwoFires: (state, action) => {
      const itemIndex = state.playerTwo?.fires?.allFires?.findIndex(
        (fire) => fire === action.payload
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerTwo.fires?.allFires.push(action.payload);
        if (state.playerOne.placedShipsCoords?.includes(action.payload)) {
          state.playerTwo.fires?.successFires.push(action.payload);
          state.activePlayer = "playerTwo";
        } else {
          state.playerTwo.fires?.missedFires.push(action.payload);
          state.activePlayer = "playerOne";
        }
      } else return;
    },
    setActivePlayer: (state, action) => {
      state.activePlayer = action.payload;
    },
    setActivePlayerName: (state) => {
      if (state.activePlayer === "playerOne") {
        state.activePlayerName = state.playerOne.name;
      } else if (state.activePlayer === "playerTwo") {
        state.activePlayerName = state.playerTwo.name;
      }
    },
    setIsShipSelected: (state, action) => {
      state.isShipSelected = action.payload;
    },
  },
});

export const {
  setPlayerOneName,
  setPlayerTwoName,
  increaseGameStep,
  decreaseGameStep,
  setSelectedShipLength,
  setFilledAreas,
  placePlayerOneShips,
  placePlayerTwoShips,
  playerOneFires,
  playerTwoFires,
  setActivePlayer,
  setActivePlayerName,
  setIsShipSelected,
} = gameSlice.actions;

export default gameSlice.reducer;
