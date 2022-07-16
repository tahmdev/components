import { useReducer, useState } from "react";
import "./App.css";
import { Carousel } from "./components/Carousel/Carousel";
import { DynamicTextarea } from "./components/DynamicTextarea/DynamicTextarea";
import { MultiRange } from "./components/MultiRange/MultiRange";
import { PopupButton } from "./components/PopupButton/PopupButton";
import SwipeButton from "./components/SwipeButton/SwipeButton";
import { Toast } from "./components/Toast/Toast";
import { toastReducer } from "./components/Toast/ToastReducer";

function App() {
  const [currentComponent, setCurrentComponent] = useState("DynamicTextarea");
  const [toastNotifs, dispatch] = useReducer(toastReducer, []);
  const [showPopupButton, setShowPopupButton] = useState(false);
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
        {currentComponent === "PopupButton" && (
          <PopupButton show={showPopupButton} setShow={setShowPopupButton}>
            <span>I have a popup</span>
            <div className="test">I am a popup</div>
          </PopupButton>
        )}
        {currentComponent === "Carousel" && (
          <Carousel autoScroll={4000}>
            <div className="orange-bg">First Carousel Item</div>
            <div>Second Carousel Item</div>
            <img src="https://i.imgur.com/G7OSlt6.png" />
          </Carousel>
        )}
        {currentComponent === "DynamicTextarea" && (
          <DynamicTextarea
            className="dynamic-textarea"
            minRows={1}
            maxRows={5}
            placeholder="Message here"
            onChange={(e) => console.log(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
