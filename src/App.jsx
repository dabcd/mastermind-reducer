import { createContext, useReducer, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "./Header";
import Row from "./Row";
import Pegs from "./Pegs";
import { INT_CHOICES } from "./prefs";
import { initialStore, reducer } from "./store";

function drawColors() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(Math.floor(Math.random() * 6));
  }
  return a;
}

export const StoreDispatch = createContext(null);
export const StoreState = createContext(null);

let didInit = false;

export default function App() {
  // global state:
  const [store, dispatch] = useReducer(reducer, initialStore);

  const [keysRows, setKeysRows] = useState(
    Array.from(Array(INT_CHOICES).keys())
  );

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      initGame();
    }
  }, []);

  function initGame() {
    const randomColors = drawColors();
    dispatch({ type: "drawNewColors", payload: randomColors });

    // nanoid generated keys for the Rows
    let k = [];
    for (let i = 0; i < INT_CHOICES; i++) {
      k.push(nanoid());
    }
    setKeysRows(k);
  }

  if (store.isPlayAgain) {
    // Reset the store
    dispatch({ type: "reset" });

    initGame();
  }

  let rowElements = [];
  for (let i = 0; i < INT_CHOICES; i++) {
    rowElements.push(<Row key={keysRows[i]} id={i} />);
  }

  return (
    <StoreDispatch.Provider value={dispatch}>
      <StoreState.Provider value={store}>
        <div className="App">
          <Header />
          <div className="main">
            <div>{rowElements}</div>
            <Pegs />
          </div>
        </div>
      </StoreState.Provider>
    </StoreDispatch.Provider>
  );
}
