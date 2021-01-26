const { default: axios } = require("axios");
const express = require("express");
const app = express();
const movieList = require('./moviesData.json');
const movieDetailsSchema = require('./schema/movie');

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcone movies database");
})

app.get('/movies', (req, res) => {
  res.send(movieList);
})



const validCheck = (req, res) => {
  const validData = movieDetailsSchema.validate(req.body);
  if (validData.error) {
    return validData.error;
  };
};

const findData = (id) => {
  return movieList.find(item => item.id === id);
}

app.post('/movies', (req, res) => {
  const validError = validCheck(req, res);
  if (validError) {
    return res.status(400).send({
      isSuccess: false,
      message: validError.details[0].message,
    })
  }
  const foundMovies = findData(req.body.title);
  if (foundMovies) {
    return res.status(400).send({
      isSuccess: false,
      message: `${req.body.title}, this title is already saved.`
    })
  }

  const randomNumber = Math.floor(Math.random(6) * 10000000)
  req.body.id = `tt${randomNumber}`;
  movieList.push(req.body);
  return res.status(200).send({
    isSuccess: true,
    data: req.body,
    message: 'saved in DB'
  });
});

app.patch('/movies', (req, res) => {
  const validError = validCheck(req, res);
  if (validError) {
    return res.status(400).send({
      isSuccess: false,
      message: validError.details[0].message,
    })
  }
  const foundMovies = findData(req.body.id);
  if (foundMovies) {
    const findIndex = movieList.findIndex((item) => item.id === foundMovies.id);
    movieList[findIndex] = req.body;
    return res.status(200).send({
      isSuccess: true,
      data: req.body,
      message: 'update in DB'
    });
  }
  return res.status(400).send({
    isSuccess: false,
    message: 'this movie is not match.'
  });
})

app.delete('/movies', (req, res) => {
  const validError = validCheck(req, res);
  if (validError) {
    return res.status(400).send({
      isSuccess: false,
      message: validError.details[0].message,
    })
  }
  const foundMovies = findData(req.body.id);
  if (foundMovies) {
    const findIndex = movieList.findIndex((item) => item.id === foundMovies.id);
    movieList.splice(findIndex, 1);
    return res.status(200).send({
      isSuccess: true,
      message: 'delete in DB'
    });
  }
  return res.status(400).send({
    isSuccess: false,
    message: 'this movie is not match.'
  });
})

app.listen(4000, () => {
  console.log("start");
});

// pass param id in ALL
// update: check title, remove required
// 
