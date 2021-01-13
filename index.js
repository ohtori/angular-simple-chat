const server = require('http').createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true
  }
});


let users = [];
const messages = [];
const authorizedUsers = {
  Alexei: '123456',
  Alexandr: '123456',
  Andrei: '123456',
  Ilia: '123456',
  Mihail: '123456',
  Anna: '123456',
  Elena: '123456',
  Katia: '123456',
  Marina: '123456',
  Polina: '123456'
}


io.on('connection', client => {
  let currentUser = { error: 'No authorization' };
  client.emit('connected', { msg: 'Hello from socket' });

  client.on('register-user', data => {
    if (authorizedUsers[data.user.name] !== data.password) {
      return client.emit('user-registred', { currentUser });;
    }
    users = users.filter(user => user.name !== data.user.name);
    currentUser = data.user;
    users.push(currentUser);
    client.broadcast.emit('user-enter', { users });
    client.emit('user-registred', { users, currentUser });
    client.broadcast.emit('message-sended', { from: 'OhtoriChat', fromID: 0, incommingTime: new Date(), message: `${data.user.name} enter` });
    client.emit('message-sended', { from: 'OhtoriChat', fromID: 0, incommingTime: new Date(), message: `Hello ${data.user.name}` });
  });

  client.on('send-message', data => {
    if (messages.length > 10000) {
      messages.slice(100, messages.length);
    }
    const message = data.message;
    messages.push(message);
    client.broadcast.emit('message-sended', message);
    client.emit('message-sended', message);
  });

  client.on('disconnect', () => {
    if (currentUser) {
      users = users.filter(user => user.name !== currentUser.name);
      client.broadcast.emit('message-sended', { from: 'OhtoriChat', fromID: 0, incommingTime: new Date(), message: `${currentUser.name} disconnected` });
    }
    client.broadcast.emit('user-enter', { users });
    currentUser = null;
  });
});
server.listen(8888);