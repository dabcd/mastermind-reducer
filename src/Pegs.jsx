import React from "react";
import { colors } from "./prefs";
import { StoreDispatch } from "./App";

export default function Pegs(props) {
  const dispatch = React.useContext(StoreDispatch);
  return (
    <div className="Pegs">
      {colors.map((color, index) => (
        <div
          key={index}
          className={props.store.activeColor === index ? "peg active" : "peg"}
          style={{ backgroundColor: color }}
          onClick={() => dispatch({ type: "activeColor", payload: index })}
        ></div>
      ))}
    </div>
  );
}
