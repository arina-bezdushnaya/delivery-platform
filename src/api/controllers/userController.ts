import {Response, Request} from 'express';
import users from '../../database/users.json';
import {User} from '../../types';

function findUserIndexById(id: number | string) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) return i;
  }
  return -1;
}

export function getUsers(req: Request, res: Response) {
  res.send(users);
}

export function getUserById(req: Request, res: Response) {
  const id = req.params.id;

  const index = findUserIndexById(id);

  if (index !== -1) {
    res.send(users[index]);
  } else {
    res.status(404).send('User not found');
  }
}

export function addUser(req: Request, res: Response) {
  const id: number = users[users.length - 1].id++;

  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user: User = {
    name: userName,
    age: userAge,
    id,
  };

  users.push(user);

  res.send(user);
  return;
}

export function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const index = findUserIndexById(id);

  if (index !== -1) {
    const user = users.splice(index, 1)[0];
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
}

export function updateUser(req: Request, res: Response) {
  if (!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;

  const index = findUserIndexById(id);

  if (index !== -1) {
    const user: User = users[index];
    user.age = userAge;
    user.name = userName;
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
  return;
}
