import { useState, useContext } from "react";
import Hint from "./Hint";
import { colors, INT_CHOICES } from "./prefs";
import { StoreDispatch, StoreState } from "./App";

export default function Row(props) {
  const [pegs, setPegs] = useState([null, null, null, null]);
  const [hint, setHint] = useState([null, null, null, null]);

  const dispatch = useContext(StoreDispatch);
  const store = useContext(StoreState);

  const isThisRowActive = store.activeRow === props.id ? true : false;

  function choosePeg(id) {
    if (!store.isLost && !store.isWon && isThisRowActive) {
      setPegs((prevs) =>
        prevs.map((prev, index) =>
          index === id ? (prev = store.activeColor) : prev
        )
      );
    }
  }

  function shiftActiveRow() {
    dispatch({ type: "shiftActiveRow" });

    // Check if the game is lost
    if (props.id === INT_CHOICES - 1 && !store.isWon) {
      dispatch({ type: "gameLost" });
    }
  }

  function checkGuess() {
    if (isThisRowActive && !pegs.includes(null)) {
      let array = [];
      let black = 0;
      let white = 0;
      let flags = [false, false, false, false];

      // Counting correct positions & colors (blacks):
      for (let i = 0; i < 4; i++) {
        if (pegs[i] === store.draw[i]) {
          black++;
        }
      }

      // Counting correct colors regardless of positions (whites + blacks)
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (pegs[j] === store.draw[i] && !flags[j]) {
            white++;
            flags[j] = true;
            break;
          }
        }
      }
      white = white - black;

      // Constructing hint array:
      for (let i = 0; i < black; i++) {
        array.push("black");
      }
      for (let i = 0; i < white; i++) {
        array.push("white");
      }
      for (let i = 0; i < 4 - black - white; i++) {
        array.push("wrong");
      }
      setHint(array);

      if (black === 4) {
        // The game is won!
        dispatch({ type: "gameWon" });
      }

      // The next row becomes active:
      shiftActiveRow();
    }
  }

  return (
    <div className="Row">
      {pegs.map((peg, index) => (
        <div
          key={index}
          className={isThisRowActive ? "peg active" : "peg"}
          onClick={() => choosePeg(index)}
          style={peg === null ? null : { backgroundColor: colors[peg] }}
        ></div>
      ))}
      <div
        className={
          store.activeRow > props.id
            ? "check used"
            : !pegs.includes(null)
            ? "check hovering :hover"
            : "check"
        }
        onClick={checkGuess}
      >
        <div>+</div>
      </div>
      <Hint hint={hint} />
    </div>
  );
}
