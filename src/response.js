const response = {
  msg: "",
  date: new Date(),
  roomID: "",
  role: "",
  mode: 0,
  step: 0,
};
const setMessage = (_message) => {
  response.msg = _message;
};
const setResponse = (_socket) => {
  response.role = _socket.role;
  response.mode = _socket.mode;
  response.step = _socket.step;
  response.date = new Date();
};

export default {
  setRoomId: (_roomID) => {
    response.roomID = _roomID;
  },

  setMode: (_mode) => {
    response.mode = _mode;
  },

  setStep: (_step) => {
    response.step = _step;
  },

  setRole: (_role) => {
    response.role = _role;
  },

  error: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    _target.emit("error", response);
    _target.disconnect();
  },

  enter: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    _target.emit("enter", response);
  },

  exit: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    _target.emit("exit", response);
  },

  changeMode: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    _target.emit("changeMode", response);
  },

  changeStep: (_socket, _target, _message) => {
    setResponse(_socket);
    setMessage(_message);
    _target.emit("changeStep", response);
  },
};
