// Global state functions

export const initialStore = {
  isWon: false,
  isLost: false,
  isPlayAgain: false,
  draw: [],
  activeColor: null,
  activeRow: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case "gameWon":
      return { ...state, isWon: true };
    case "gameLost":
      return { ...state, isLost: true };
    case "gamePlayAgain":
      return { ...state, isPlayAgain: true };
    case "drawNewColors":
      return { ...state, draw: action.payload };
    case "activeColor":
      return { ...state, activeColor: action.payload };
    case "shiftActiveRow":
      return { ...state, activeRow: state.activeRow + 1 };
    case "reset":
      return initialStore;
    default:
      throw new Error();
  }
}
