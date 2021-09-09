function debounce(interval, callback) {
  let timeout;
  return function fn(...params) {
    clearTimeout(timeout);

    const promise = new Promise((resolve) => {
      timeout = setTimeout(() => {
        console.log('debounced');
        const result = callback.apply(this, params);
        resolve(result);
      }, interval);
    });

    return promise;
  };
}

module.exports = debounce;
