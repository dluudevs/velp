// https://javascript.plainenglish.io/debounce-in-javascript-7715d4266542
// debounce must be used in conjunction with useCallback otherwise it would create a new debounce function on every re-render, re-initializing (erasing) the value of timer
// timers will not be cleared properly without useCallback
export const debounce = (func, delay = 350) => {
  // initialize timer out of scope of returning function otherwise it would be reinitialized every time the returning function runs and not contain the correct timeout id
  let timer;
  return (...args) => {
    // clears previous setTimeout as this function will be called frequently. it prevents callback from being called by previous timers, there should only be one active timer at a time and called only after the delay
    clearTimeout(timer);
    timer = setTimeout( () => {
      func(...args)
    }, delay)
  }
}