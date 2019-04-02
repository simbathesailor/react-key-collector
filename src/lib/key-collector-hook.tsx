import React, { useEffect } from "react";

// API

// useKeyCollector(keys array, callbacks, element)
// useKeyCollector({
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
      const stringVersion: string = event.which.toString();
      PressedKeyMapping[stringVersion] = true;
      if (checkWhetherRequiredKeyPressed(keysArray, PressedKeyMapping)) {
        callback(event);
        keysArray.forEach((elem: number | string) => {
          PressedKeyMapping[elem] = false;
        });
      }
    }
  );
  element.addEventListener(
    "keyup",
    (event: { which: any; [key: string]: any }) => {
      const stringVersion: string = event.which.toString();
      PressedKeyMapping[stringVersion] = false;
    }
  );
}

function useKeyCollector(
  keysArray: any,
  callback: any,
  element: null | HTMLElement | Element | DocumentAndElementEventHandlers,
  elementExtractor?: () =>
    | null
    | HTMLElement
    | Element
    | DocumentAndElementEventHandlers
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

export default useKeyCollector;
