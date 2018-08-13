const movies = require('express').Router();
const axios = require('axios').default;

const { TMDB_API_URL, TMDB_API_KEY } = process.env;

movies.get('/upcoming', async (req, res) => {
  const { data: config } = await axios.get(`${TMDB_API_URL}/configuration?api_key=${TMDB_API_KEY}`);
  const { data: upcoming } = await axios.get(`${TMDB_API_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`);
  const baseURL = config.images.secure_base_url;

  upcoming.results = upcoming.results.map((r) => {
    const movie = { ...r };
    movie.poster_path = `${baseURL}/w500${movie.poster_path}`;
    return movie;
  });

  res.json(upcoming);
});

module.exports = movies;
