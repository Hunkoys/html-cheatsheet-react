function pack(content) {
  return { content };
}

function unpack(json) {
  return json.content;
}

function fetchHandler(res) {
  if (res.ok) {
    return res.json().then((json) => {
      return unpack(json);
    });
  } else throw res.status;
}

const network = {
  get(query) {
    return fetch(query).then(fetchHandler);
  },

  post(query, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pack(data)),
    };

    return fetch(query, options).then(fetchHandler);
  },

  put(query, data) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pack(data)),
    };

    return fetch(query, options).then(fetchHandler);
  },

  delete(query) {
    const options = {
      method: 'DELETE',
    };

    return fetch(query, options).then(fetchHandler);
  },
};

export default network;
