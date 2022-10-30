import React from "react";
import { StoreDispatch } from "./App";

const Rules =
  "Guess the color of each of the four pegs. The colors can repeat. After each guess you will recieve a hint: black color means that you have guessed the position and a color of a peg, white - that you guessed a color, 'x' means that both position and color are wrong.";

export default function Header(props) {
  const dispatch = React.useContext(StoreDispatch);

  const [isShowRules, setIsShowrules] = React.useState(false);

  function newGame() {
    // Play a new game:
    dispatch({ type: "gamePlayAgain" });
  }

  return (
    <div className="Header">
      <h1>MASTERMIND</h1>
      {(props.store.isWon || props.store.isLost) && (
        <div>
          {props.store.isWon && (<h2>You won!</h2>)}
          {props.store.isLost && (<h2>You lost.</h2>)}
          <button onClick={newGame}>Play again</button>
        </div>
      )}
      {!props.store.isWon && !props.store.isLost && (
        <div>
          <button onClick={() => setIsShowrules((prev) => !prev)}>
            {isShowRules ? "Hide rules" : "Show rules"}
          </button>
          {isShowRules ? <p>{Rules}</p> : null}
        </div>
      )}
    </div>
  );
}
