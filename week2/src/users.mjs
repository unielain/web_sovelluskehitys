const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com"
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com"
  }
];


const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const userFound = users.find(user => user.id == req.params.id);
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).json({error: 'not found'});
  }
};

const postUser = (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({error: "user name missing"});
  }
  // new id: add 1 to last id number in the user array
  const newId = users[users.length-1].id + 1;
  const newUser = {id: newId, name: req.body.name};
  users.push(newUser);
  res.status(201).json({message: 'user created'});
};


const putUser = (req, res) => {
  const index = users.findIndex(user => user.id == req.params.id);
  // not found
  if (index === -1) {
    return res.sendStatus(404);
  }
  // bad request
  if (!req.body.username) {
    return res.status(400).json({error: "user name missing"});
  }
  users[index].name = req.body.name;
  res.json({updated_user: users[index]});
};

// Dummy login, returns user object if username & password match
const postLogin = (req, res) => {
  const userCreds = req.body;
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find(user => user.username == userCreds.username);
  // user not found
  if (!userFound) {
    return res.status(403).json({error: 'username/password invalid'});
  }
  // check if posted password matches to user found password
  if (userFound.password === userCreds.password) {
    res.json({message: 'logged in successfully', user: userFound});
  } else {
    return res.status(403).json({error: 'username/password invalid'});
  }
};

export {getUsers, getUserById, postUser, putUser, postLogin};
