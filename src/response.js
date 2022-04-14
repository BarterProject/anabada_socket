const response = {
  message: "",
  date: new Date(),
  email: "",
  type: "",
};

const setMessage = (_message) => {
  response.message = _message;
};

const setType = (_type) => {
  response.type = _type;
};

const setResponse = (_socket) => {
  response.date = new Date();
  if (_socket.user != null) response.email = _socket.user.email;
};

export default {
  error: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    setType("error");

    _target.emit("error", response);
    _target.disconnect();
  },

  message: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    setType("message");

    _target.emit("message", response);
  },
};
