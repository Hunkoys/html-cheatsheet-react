function debounce(delay, callback) {
  let timeout;
  return function (...params) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('debounced');
      callback.apply(this, params);
    }, delay);
  };
}

function limit(interval, callback) {
  let lastCall = Date.now();
  return function (...params) {
    const now = Date.now();
    if (now - lastCall < interval) return;

    lastCall = now;
    console.log('limitCall');
    callback.apply(this, params);
  };
}

export default debounce;
export { debounce, limit };
