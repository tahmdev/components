import { useReducer, useState } from "react";
import "./App.css";
import { MultiRange } from "./components/MultiRange/MultiRange";
import SwipeButton from "./components/SwipeButton/SwipeButton";
import { Toast } from "./components/Toast/Toast";
import { toastReducer } from "./components/Toast/ToastReducer";

function App() {
  const [currentComponent, setCurrentComponent] = useState("MultiRange");
  const [toastNotifs, dispatch] = useReducer(toastReducer, []);
  const fnl = (a: any) => console.log(a);
  const fnr = () => console.log("RIGHT");
  const handleMultiRangeChange = (min: number, max: number) => {
    console.log(min, max);
  };
  return (
    <div className="App">
      <div className="container">
        {currentComponent === "SwipeButton" && (
          <SwipeButton rightFn={fnr} leftFn={() => fnl("LEFT")}>
            <div>aaaaaaaaaaaaaaaaa</div>
          </SwipeButton>
        )}
        {currentComponent === "Toast" && (
          <>
            <button
              onClick={() =>
                dispatch({
                  actionType: "add",
                  text: `${Math.random()}`,
                  notifType: "info",
                })
              }
            >
              add
            </button>

            <button onClick={() => dispatch({ actionType: "remove", id: 0 })}>
              remove
            </button>
            <Toast
              notifications={toastNotifs}
              dispatch={dispatch}
              autoRemove={2000}
            />
          </>
        )}
        {currentComponent === "MultiRange" && (
          <MultiRange
            min={0}
            max={100}
            initMin={10}
            initMax={60}
            onChange={handleMultiRangeChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
