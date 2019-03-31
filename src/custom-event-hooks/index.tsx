import React, { Component, useEffect, DOMElement } from "react";

//API

//useKeyCollector(keys array, callbacks, element)
//useKeyCollector({
//  "Shift A B": callback
//})

//keydown
//keyup
type TPressedKeyMapping = {
  [key: string]: any;
};

const PressedKeyMapping: TPressedKeyMapping = {};

function checkWhetherRequiredKeyPressed(
  keysArray: number[] | string[],
  PressedKeyMapping: TPressedKeyMapping
) {
  return keysArray.every((elem: number | string) => {
    return PressedKeyMapping[elem];
  });
}
function useKeyDown(
  element: any,
  callback: Function,
  keysArray: string[] | number[]
) {
  element.addEventListener(
    "keydown",
    (event: { which: number; [key: string]: any }) => {
      console.log("in key down", event.which);
      const stringVersion: string = event.which.toString();
      PressedKeyMapping[stringVersion] = true;
      console.log(
        "checkWhetherRequiredKeyPressed(keysArray, PressedKeyMapping)",
        PressedKeyMapping
      );
      if (checkWhetherRequiredKeyPressed(keysArray, PressedKeyMapping)) {
        callback(event);
        keysArray.forEach((elem: number | string) => {
          PressedKeyMapping[elem] = false;
        });
      }
      console.log(PressedKeyMapping);
    }
  );
  element.addEventListener(
    "keyup",
    (event: { which: any; [key: string]: any }) => {
      console.log("in key up", event.which);
      const stringVersion: string = event.which.toString();
      PressedKeyMapping[stringVersion] = false;
      console.log(PressedKeyMapping);
    }
  );
}

function useKeyCollector(
  keysArray: any,
  callback: any,
  element: Document | null | HTMLElement | Element,
  elementExtractor?: () => Document | null | HTMLElement | Element
) {
  const currentKeyDown = [];
  useEffect(() => {
    if (!element && !elementExtractor) {
      return;
    }
    if (elementExtractor) {
      element = elementExtractor();
    }
    useKeyDown(element, callback, keysArray);
    return () => {
      if (element) element.removeEventListener("keydown", callback);
      if (element) element.removeEventListener("keyup", callback);
    };
  }, [element]);
  // return
}

// export default function test() {
//   return "test"
// }

export default useKeyCollector;
