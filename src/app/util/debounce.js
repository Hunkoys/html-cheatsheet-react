function debounce(interval, callback) {
  let timeout;
  return function fn(...params) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('debounced');
      callback.apply(this, params);
    }, interval);
  };
}

export default debounce;
