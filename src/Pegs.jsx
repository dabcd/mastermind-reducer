import { useContext } from "react";
import { colors } from "./prefs";
import { StoreDispatch, StoreState } from "./App";

export default function Pegs() {
  const dispatch = useContext(StoreDispatch);
  const store = useContext(StoreState);

  return (
    <div className="Pegs">
      {colors.map((color, index) => (
        <div
          key={index}
          className={store.activeColor === index ? "peg active" : "peg"}
          style={{ backgroundColor: color }}
          onClick={() => dispatch({ type: "activeColor", payload: index })}
        ></div>
      ))}
    </div>
  );
}
