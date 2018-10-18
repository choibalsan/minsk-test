function throttleIfMoreThanN(func, permittedPerSpan = 1, timeSpan = 1000) {
  if (permittedPerSpan < 1) return () => {}; // since there's no sense to run func less than 1 time per frame, do nothing

  let runsCount = 0;
  let lastArgs;
  let lastThis;

  // wrapper func, that will be actually called
  function wrapper() {
    if (runsCount >= permittedPerSpan) {
      lastArgs = arguments;
      lastThis = this;
      // skip execution, if function runs reached the limit
      return;
    }

    func.apply(this, arguments);

    runsCount++;

    setTimeout(function() {
      runsCount = 0;
      // at the end of the frame, check if there was skipped execution, call if so
      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, timeSpan);
  }

  return wrapper;
}
