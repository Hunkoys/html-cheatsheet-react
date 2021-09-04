function debounce(interval, callback) {
  let timeout;
  return function fn(...params) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, params);
    }, interval);
  };
}

module.exports = debounce;
