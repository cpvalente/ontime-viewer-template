/**
 * This is a very minimal example for a socket io client
 * You could use this as a starting point to creating your own interfaces
 */

// this would need to resolve to the hostname of where ontime is running
const socket = io.connect('http://localhost:4001', { forceNew: true });

/**
 * Updates the html when a new message is received
 * @param {string} field
 * @param {any} payload
 */
const updateDOM = (field, payload) => {
  console.log(field, payload);

  // get element
  const el = document.getElementById(field);
  if (el) {
    // change data
    el.innerText = JSON.stringify(payload, null, 2);

    // example running timer
    if (field === 'timer') {
      const timer = document.getElementById('running');
      // payload.running contains current timer in seconds
      // here I use a date object to do the conversion,
      // you should probably calculate this yourself or use a library
      const now = new Date(payload.running * 1000);
      // extract what we need
      timer.innerText = `${now.getUTCHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }

    // update timestamp
    const tag = document.getElementById('timestamp');
    tag.innerText = new Date();
  }
};

// register listeners
socket.on('messages-timer', (msg) => updateDOM('messages-timer', msg));
socket.on('messages-public', (msg) => updateDOM('messages-public', msg));
socket.on('messages-lower', (msg) => updateDOM('messages-lower', msg));
socket.on('timer', (msg) => updateDOM('timer', msg));
socket.on('onAir', (msg) => updateDOM('onAir', msg));
socket.on('titles', (msg) => updateDOM('titles', msg));
socket.on('publictitles', (msg) => updateDOM('publictitles', msg));
