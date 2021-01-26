const { default: axios } = require("axios");
const express = require("express");

const app = express();

const user = [
  { id: 1, name: "Awadhesh", age: 10, city: "Chakia" },
  { id: 2, name: "Ravi", age: 18, city: "Bangalore" },
  { id: 3, name: "Nischal", age: 19, city: "Chakia" },
  { id: 4, name: "Rahul", age: 17, city: "Chakia" },
  { id: 5, name: "Shubham", age: 12, city: "Chakia" },
];

app.get("/", (req, res) => {
  res.send("no data");
});
app.get("/user", (req, res) => {
  res.send(user);
});

app.get("/user/:id", (req, res) => {
  if (req.params.id.lastIndexOf(".") > -1) {
    return res.send("Invalid Id");
  }
  let abc = Number(req.params.id);
  if (abc <= 0) {
    return res.send("Please enter correct user Id.");
  }
  const findUser = user.find(({ id }) => id === abc);
  return res.send(findUser ? findUser : "user Id not match");
});

let userList = [];
let postList = [];
app.get("/profile/:profileId",async (req, res) => {
    const id = req.params.profileId;
    console.log('id', id);
  await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((responseUser) => {
        // return res.send(responseUser.data);
     return axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((responsePost) => {
          const obj = {
              user: responseUser.data,
              post: responsePost.data
          }
          return res.send(obj);
      })
      .catch((err) => {
        return res.send("Error");
      });
    })
    .catch((err) => {
        return res.send("Error");
    });
});

app.listen(4000, () => {
  console.log("start");
});
