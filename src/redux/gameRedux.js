import { ships } from "../ships";
import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "users",
  initialState: {
    playerOne: {
      isReady: false,
      name: "",
      waitingShips: ships,
      placedShipsCoords: [],
      sunkedShipsCoords: [],
      fires: {
        allFires: [],
        missedFires: [],
        successFires: [],
        successSinks: [],
      },
    },
    playerTwo: {
      isReady: false,
      name: "",
      waitingShips: ships,
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

    winner: "",
    isGameStarted: false,
    isGameEnd: false,
  },

  reducers: {
    setPlayerNames: (state, action) => {
      state.playerOne.name = action.payload.playerOneName.toUpperCase();
      state.playerTwo.name = action.payload.playerTwoName.toUpperCase();
    },
    setGameStarted: (state) => {
      state.isGameStarted = true;
    },
    placeShip: (state, action) => {
      let selectedShipId = action.payload.selectedShipId;
      let player = action.payload.player;
      const flatten = state[player].placedShipsCoords?.flat();
      const isPlaced = action.payload.shipCoord.some((item) =>
        flatten.includes(item)
      );
      if (isPlaced === false) {
        state[player]?.placedShipsCoords?.push(action.payload.shipCoord);
        state[player].waitingShips[selectedShipId].isPlaced = true;
        if (state[player].placedShipsCoords.length === 5) {
          state[player].isReady = true;
        }
      } else return;
    },
    resetShipPosition: (state, action) => {
      let player = action.payload;
      state[player].placedShipsCoords = [];
      state[player].waitingShips = ships;
      state[player].isReady = false;
    },

    playerOneFires: (state, action) => {
      ///I TRIED REFACTORING THIS AND playerTwoFires AT THE BELOW
      //BUT IT DID NOT WORKED SOMEHOW
      const itemIndex = state.playerOne.fires?.allFires?.findIndex(
        (fire) => fire === action.payload.area
      );
      state.activePlayer = "playerOne";

      if (itemIndex === -1) {
        state.playerOne.fires?.allFires.push(action.payload.area);
        if (
          state.playerTwo.placedShipsCoords
            ?.flat()
            .includes(action.payload.area)
        ) {
          state.playerOne.fires?.successFires.push(action.payload.area);
          state.activePlayer = "playerOne";
        } else {
          state.playerOne.fires?.missedFires.push(action.payload.area);
          state.activePlayer = "playerTwo";
        }
      } else return;
    },

    playerTwoFires: (state, action) => {
      const itemIndex = state.playerTwo?.fires?.allFires?.findIndex(
        (fire) => fire === action.payload.area
      );
      state.activePlayer = "playerOne";

      if (itemIndex === -1) {
        state.playerTwo.fires?.allFires.push(action.payload.area);
        if (
          state.playerOne.placedShipsCoords
            ?.flat()
            .includes(action.payload.area)
        ) {
          state.playerTwo.fires?.successFires.push(action.payload.area);
          state.activePlayer = "playerTwo";
        } else {
          state.playerTwo.fires?.missedFires.push(action.payload.area);
          state.activePlayer = "playerOne";
        }
      } else return;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
      state.isGameEnd = true;
    },
    reset: (state) => {},
  },
});

export const {
  playerOneFires,
  playerTwoFires,
  placeShip,
  resetShipPosition,
  setWinner,
  reset,
  setGameStarted,
  setPlayerNames,
} = gameSlice.actions;

export default gameSlice.reducer;
