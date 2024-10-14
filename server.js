const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const movies = require('./movies.json');

app.get('/movies', (req, res) => {
  const { genre, language, search } = req.query;
  let filteredMovies = movies;

  if (genre) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.Genre.toLowerCase().split(',').some(g => g.trim() === genre)
    );
  }

  if (language) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.Language.toLowerCase().split(',').some(l => l.trim() === language)
    );
  }

  if (search) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.Title.toLowerCase().includes(search.toLowerCase()) ||
      movie.Plot.toLowerCase().includes(search.toLowerCase()) ||
      movie.Director.toLowerCase().includes(search.toLowerCase()) ||
      movie.Actors.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredMovies);
});

app.get('/movies/:imdbID', (req, res) => {
  const movie = movies.find(m => m.imdbID === req.params.imdbID);
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
