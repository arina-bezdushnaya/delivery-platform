import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
//
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
//
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });


app.use(express.json());
app.use(express.static("public"));

interface User {
  id?: number;
  name: string;
  age: number;
}

// условная база данных
const users: User[] = [];
let id = 1;     // для установки идентификаторов

// вспомогательная функция для поиска индекса пользователя по id
function findUserIndexById(id: number) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) return i;
  }
  return -1;
}

app.get("/api/users", function (_, res) {
  res.send(users);
});

// получение одного пользователя по id
app.get("/api/users/:id", function (req, res) {
  const id = req.params.id; // получаем id
  // находим в массиве пользователя по id
  const index = findUserIndexById(Number(id));
  // отправляем пользователя
  if (index > -1) {
    res.send(users[index]);
  } else {
    res.status(404).send("User not found");
  }
});

// получение отправленных данных
app.post("/api/users", function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user: User = {name: userName, age: userAge};
  // присваиваем идентификатор из переменной id и увеличиваем ее на единицу
  user.id = id++;
  // добавляем пользователя в массив
  users.push(user);
  res.send(user);
});

// удаление пользователя по id
app.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const index = findUserIndexById(Number(id));
  if (index > -1) {
    // удаляем пользователя из массива по индексу
    const user = users.splice(index, 1)[0];
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
});

// изменение пользователя
app.put("/api/users", function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;

  const index = findUserIndexById(id);
  if (index > -1) {
    // изменяем данные у пользователя
    const user = users[index];
    user.age = userAge;
    user.name = userName;
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
