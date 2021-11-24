// https://javascript.plainenglish.io/debounce-in-javascript-7715d4266542
// debounce must be used in conjunction with useCallback otherwise it would create a new debounce function on every re-render, re-initializing (erasing) the value of timer

import { useCallback } from "react";

// timers will not be cleared properly without useCallback
export const debounce = (func, delay = 500) => {
  // initialize timer out of scope of returning function otherwise it would be reinitialized every time the returning function runs and not contain the correct timeout id - this is why a closure is created
  let timer;
  // it is important to note that debounce is a callback function being passed to useCallback. Therefore it can be called inside of useCallback. Unlike an annoymous function which cannot be called inside useCallback, only passed as an argument
  // the returned function is what is being passed to useCallback since debounce is called inside of useCallback (see illustration below)
  return (...args) => {
    // clears previous setTimeout as this function will be called frequently. it prevents callback from being called by previous timers, there should only be one active timer at a time and called only after the delay
    clearTimeout(timer);
    timer = setTimeout( () => {
      func(...args)
    }, delay)
  }
}

// Illustration of useCallback
const callback = debounce(() => {
  console.log('do something')
}, 1000)
const someFunction = useCallback(callback)

// when passed to usecallback
// useCallback(() => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, delay);
//   }
// })