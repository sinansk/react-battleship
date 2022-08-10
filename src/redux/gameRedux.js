import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "users",
  initialState: {
    waitingShips: [
      {
        name: "carrier",
        id: "0",
        length: "5",
        isPlaced: false,
        height: "200px",
        width: "20px",
      },
      {
        name: "battleship",
        id: "1",
        length: "4",
        isPlaced: false,
        height: "160px",
        width: "20px",
      },
      {
        name: "cruiser",
        id: "2",
        length: "3",
        isPlaced: false,
        height: "120px",
        width: "20px",
      },
      {
        name: "submarine",
        id: "3",
        length: "3",
        isPlaced: false,
        height: `120px`,
        width: "20px",
      },
      {
        name: "destroyer",
        id: "4",
        length: "2",
        isPlaced: false,
        height: "80px",
        width: "20px",
      },
    ],
    playerOne: {
      isReady: false,
      name: "",
      waitingShips: [
        {
          name: "carrier",
          id: "0",
          length: "5",
          isPlaced: false,
          height: "200px",
          width: "20px",
        },
        {
          name: "battleship",
          id: "1",
          length: "4",
          isPlaced: false,
          height: "160px",
          width: "20px",
        },
        {
          name: "cruiser",
          id: "2",
          length: "3",
          isPlaced: false,
          height: "120px",
          width: "20px",
        },
        {
          name: "submarine",
          id: "3",
          length: "3",
          isPlaced: false,
          height: `120px`,
          width: "20px",
        },
        {
          name: "destroyer",
          id: "4",
          length: "2",
          isPlaced: false,
          height: "80px",
          width: "20px",
        },
      ],
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
      waitingShips: [
        {
          name: "carrier",
          id: "0",
          length: "5",
          isPlaced: false,
          height: "200px",
          width: "20px",
        },
        {
          name: "battleship",
          id: "1",
          length: "4",
          isPlaced: false,
          height: "160px",
          width: "20px",
        },
        {
          name: "cruiser",
          id: "2",
          length: "3",
          isPlaced: false,
          height: "120px",
          width: "20px",
        },
        {
          name: "submarine",
          id: "3",
          length: "3",
          isPlaced: false,
          height: `120px`,
          width: "20px",
        },
        {
          name: "destroyer",
          id: "4",
          length: "2",
          isPlaced: false,
          height: "80px",
          width: "20px",
        },
      ],
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
    gameStep: 0,
  },

  reducers: {
    setPlayerOneName: (state, action) => {
      state.playerOne.name = action.payload;
    },
    setPlayerTwoName: (state, action) => {
      state.playerTwo.name = action.payload;
    },
    setGameStarted: (state) => {},
    increaseGameStep: (state) => {
      state.gameStep += 1;
    },
    decreaseGameStep: (state) => {
      if (state.gameStep > 0) {
        state.gameStep -= 1;
      }
    },
    setWaitingShips: (state, action) => {
      let player = action.payload.player;
      console.log(player);
    },

    placeShip: (state, action) => {
      let selectedShipId = action.payload.selectedShipId;
      let player = action.payload.player;
      const flatten = state[player].placedShipsCoords?.flat();
      if (state[player].placedShipsCoords.length === 4) {
        state[player].isReady = true;
      }
      if (state.playerOne.isReady && state.playerTwo.isReady) {
        state.isGameStarted = true;
      }
      const isPlaced = action.payload.shipCoord.some((item) =>
        flatten.includes(item)
      );
      if (isPlaced === false) {
        state[player]?.placedShipsCoords?.push(action.payload.shipCoord);
        state[player].waitingShips[selectedShipId].isPlaced = true;
      } else return;
    },
    resetShipPosition: (state, action) => {
      let player = action.payload;
      state[player].placedShipsCoords = [];
      state[player].waitingShips = state.waitingShips;
      state[player].isReady = false;
      state.isGameStarted = false;
    },

    playerOneFires: (state, action) => {
      let player = action.payload.player;
      let opponent = action.payload.opponent;
      let successFires = state.playerOne.fires?.successFires;
      const itemIndex = state.playerOne.fires?.allFires?.findIndex(
        (fire) => fire === action.payload.area
      );
      state.activePlayer = "playerOne";
      console.log("player", player, "opponent", opponent);
      console.log("successFires:", successFires);
      console.log(
        "placedShipsCoords:",
        state[opponent].placedShipsCoords.flat()
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        state.playerOne.fires?.allFires.push(action.payload.area);
        if (
          state.playerTwo.placedShipsCoords
            ?.flat()
            .includes(action.payload.area)
        ) {
          state.playerOne.fires?.successFires.push(action.payload.area);
          state.activePlayerName = state.playerOne.name;
        } else {
          state.playerOne.fires?.missedFires.push(action.payload.area);
          state.activePlayerName = state.playerTwo.name;
          state.activePlayer = "playerTwo";
        }
      } else return;
    },

    playerTwoFires: (state, action) => {
      let player = action.payload.player;
      let opponent = action.payload.opponent;
      let successFires = state.playerTwo.fires?.successFires;

      state.activePlayer = "playerOne";
      console.log("player", player, "opponent", opponent);
      console.log("successFires:", successFires);
      console.log(
        "placedShipsCoords:",
        state[opponent].placedShipsCoords.flat()
      );
      const itemIndex = state.playerTwo?.fires?.allFires?.findIndex(
        (fire) => fire === action.payload.area
      );
      console.log(itemIndex);
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
    setWinner: (state, action) => {
      state.winner = action.payload;

      state.isGameEnd = true;
    },
    reset: (state) => {},
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
  setWaitingShips,
  placeShip,
  resetShipPosition,
  setWinner,
  reset,
} = gameSlice.actions;

export default gameSlice.reducer;
