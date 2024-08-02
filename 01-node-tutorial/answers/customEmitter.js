const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('login', (username) => {
    console.log(`${username} has logged in.`);
    emitter.emit('welcome', `Welcome, ${username}!`);
});

emitter.on('welcome', (message) => {
    console.log(message);
});

emitter.emit('login', 'Mary');
emitter.emit('login', 'John');