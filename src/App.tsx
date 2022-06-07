import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SwipeButton from "./components/SwipeButton/SwipeButton";

function App() {
  const fnl = (a: any) => console.log(a);
  const fnr = () => console.log("RIGHT");

  return (
    <div className="App">
      <div className="container">
        <SwipeButton rightFn={fnr} leftFn={() => fnl("LEFT")}>
          <div></div>
        </SwipeButton>
      </div>
    </div>
  );
}

export default App;
