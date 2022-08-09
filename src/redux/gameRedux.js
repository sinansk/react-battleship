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
    winner: "",
    gameStarted: false,
    gameStep: 0,
  },

  reducers: {
    setPlayerOneName: (state, action) => {
      state.playerOne.name = action.payload;
    },
    setPlayerTwoName: (state, action) => {
      state.playerTwo.name = action.payload;
    },
    setGameStarted: (state) => {
      if (state.playerOne.name !== "" && state.playerTwo.name !== "") {
        state.gameStarted = true;
      }
    },
    increaseGameStep: (state) => {
      state.gameStep += 1;
    },
    decreaseGameStep: (state) => {
      if (state.gameStep > 0) {
        state.gameStep -= 1;
      }
    },

    placeShip: (state, action) => {
      let player = action.payload.player;

      const flatten = state[player].placedShipsCoords?.flat();

      const isPlaced = flatten.some((item) =>
        action.payload.shipCoord.includes(item)
      );

      if (isPlaced === false) {
        state[player]?.placedShipsCoords?.push(action.payload.shipCoord);
      } else return;
    },
    resetShipPosition: (state, action) => {
      let player = action.payload;
      state[player].placedShipsCoords = [];
    },

    playerOneFires: (state, action) => {
      const itemIndex = state.playerOne.fires?.allFires?.findIndex(
        (fire) => fire === action.payload
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerOne.fires?.allFires.push(action.payload);
        if (
          state.playerTwo.placedShipsCoords?.flat().includes(action.payload)
        ) {
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
        if (
          state.playerOne.placedShipsCoords?.flat().includes(action.payload)
        ) {
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
    checkWinner: (state, action) => {
      let player = action.payload.player;
      let opponent = action.payload.opponent;

      console.log("player", player, "opponent", opponent);
      if (
        state[player].fires.successFires.includes(
          state[opponent].placedShipsCoords.flat()
        )
      ) {
      }
    },
  },
});

export const {
  setPlayerOneName,
  setPlayerTwoName,
  increaseGameStep,
  decreaseGameStep,
  setFilledAreas,
  placePlayerOneShips,
  placePlayerTwoShips,
  playerOneFires,
  playerTwoFires,
  setActivePlayer,
  setActivePlayerName,
  placeShip,
  resetShipPosition,
  checkWinner,
} = gameSlice.actions;

export default gameSlice.reducer;
