import React, { createContext, useReducer, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "./Header";
import Row from "./Row";
import Pegs from "./Pegs";
import { INT_CHOICES } from "./prefs";
import { initialStore, reducer } from "./store";

export const StoreDispatch = createContext(null);

export default function App() {
  // global state:
  const [store, dispatch] = useReducer(reducer, initialStore);

  // Initial keys for Rows are needed before useEffect
  // generates real ones using nanoid
  const [keysRows, setKeysRows] = useState(
    Array.from(Array(INT_CHOICES).keys())
  );

  useEffect(() => {
    // Reset the store
    dispatch({ type: "reset" });

    dispatch({ type: "drawNewColors" });

    // nanoid generated keys for the Rows
    let k = [];
    for (let i = 0; i < INT_CHOICES; i++) {
      k.push(nanoid());
    }
    setKeysRows(k);
  }, [store.isPlayAgain]);

  let rowElements = [];
  for (let i = 0; i < INT_CHOICES; i++) {
    rowElements.push(
      <Row
        key={keysRows[i]}
        id={i}
        store={store}
      />
    );
  }

  return (
    <StoreDispatch.Provider value={dispatch}>
      <div className="App">
        <Header store={store} />
        <div className="main">
          <div>{rowElements}</div>
          <Pegs store={store} />
        </div>
      </div>
    </StoreDispatch.Provider>
  );
}
