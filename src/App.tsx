import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "react-dom";
import useKeyCollector from "./custom-event-hooks/index";

function useClickHandler(
  // element: Document | null | HTMLElement | Element,
  elementRetriver: () => HTMLElement | null | Document | Element,
  callback: (event: Event) => void
) {
  useEffect(() => {
    const element = elementRetriver();
    if (!element) return;
    element.addEventListener("click", callback);
    return () => {
      if (!element) return;
      console.log("removing click event handler");
      element.removeEventListener("click", callback);
    };
  });
}

function App() {
  const [count, setCount] = useState(0);
  const [focusBox1, setFocusBox1] = useState(false);
  const t = document.getElementById("root");
  const box1: Element = document.getElementsByClassName("box1")[0];
  console.log("rendering boy");
  useKeyCollector(
    [17, 83],
    (event: React.KeyboardEvent<Element>) => {
      event.stopPropagation();
      const { keyCode } = event;
      console.log("event ===>", keyCode, document.activeElement);
      alert("no save CTRL + S");
    },
    document
  );
  // useClickHandler(
  //   ():(HTMLElement | null | Document | Element) => {
  //     return document.getElementsByClassName("box1")[0];
  //   },
  //   (event: Event) => {
  //     console.log("add click event handler", event.target);
  //     const target = event.target as HTMLDivElement;
  //     if (target) {
  //       target.focus();
  //     }
  //   }
  // );
  useLayoutEffect(() => {
    console.log("test", document.getElementsByClassName("box1")[0]);
  });
  useKeyCollector(
    [16, 69],
    (event: React.KeyboardEvent<Element>) => {
      //setFocusBox1(!focusBox1)
      event.stopPropagation();
      const { keyCode } = event;
      console.log(
        "event ===> in box1 ***",
        event,
        keyCode,
        document.activeElement
      );
      alert("here you go");
    },
    null,
    (): HTMLElement | null | Document | Element => {
      return document.getElementsByClassName("box1")[0];
    }
  );
  return (
    <div>
      <p id="test-id">{count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div className="grid-container">
        <input
          className="box1"
          tabIndex={1}
          onClick={event => {
            const target = event.target as HTMLDivElement;
            if (target) {
              const activeElement = document.activeElement as HTMLElement;
              if (activeElement) {
                window.setTimeout(() => {
                  activeElement.blur();
                }, 0);
              }
              window.setTimeout(() => {
                target.focus();
              }, 0);
            }
          }}
        />
        <div className="box2" />
        <div className="box3" />
        <div className="box4" />
      </div>
    </div>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
