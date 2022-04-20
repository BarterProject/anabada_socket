const response = {
  content: "",
  createdAt: "",
  state: "",
  route: "",
  kind: "",
  user: {},
};

const setContent = (_content) => {
  response.content = _content;
};

const setKind = (_kind) => {
  response.kind = _kind;
};

const setUser = (_user) => {
  response.user = _user;
};

const setState = (_state) => {
  response.state = _state;
};

const setResponse = () => {
  response.createdAt = new Date();
  // if (_socket.user != null) response.user.email = _socket.user.email;
};

export default {
  error: (_socket, _target, _message) => {
    setResponse();
    setContent(_message);
    setKind("error");

    _target.emit("error", response);
    _target.disconnect();
  },

  message: (_socket, _target, _message) => {
    setResponse();
    setContent(_message);
    setKind("message");

    _target.emit("message", response);
  },

  notice: (_target, _notice) => {
    setResponse();
    setContent(_notice.content[0]);
    setKind(_notice.kind[0]);
    setUser(_notice.user[0]);
    setState(_notice.state[0]);

    _target.emit("notice", response);
  },
};
