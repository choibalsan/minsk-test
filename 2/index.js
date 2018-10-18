function throttleIfMoreThanN(func, permittedPerSpan = 1, timeSpan = 1000) {
  let runsCount = 0;

  // wrapper func, that will be actually called
  function wrapper() {
    if (runsCount >= permittedPerSpan) {
      // skip execution, if function runs reached the limit
      return;
    }

    func.apply(this, arguments);

    runsCount++;

    setTimeout(function() {
      runsCount = 0;
    }, timeSpan);
  }

  return wrapper;
}
