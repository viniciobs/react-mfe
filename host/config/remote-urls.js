// Remote URLs configuration for different environments
const remoteUrls = {
  development: {
    home: 'http://localhost:3001/remote.js',
    listMovies: 'http://localhost:3002/remote.js',
    viewMovie: 'http://localhost:3003/remote.js',
  },
  production: {
    home: process.env.REMOTE_HOME_URL || 'https://your-home-app.azurestaticapps.net/remote.js',
    listMovies: process.env.REMOTE_LISTMOVIES_URL || 'https://your-list-movies-app.azurestaticapps.net/remote.js',
    viewMovie: process.env.REMOTE_VIEWMOVIE_URL || 'https://your-view-movie-app.azurestaticapps.net/remote.js',
  },
  staging: {
    home: process.env.REMOTE_HOME_URL || 'https://staging-home-app.azurestaticapps.net/remote.js',
    listMovies: process.env.REMOTE_LISTMOVIES_URL || 'https://staging-list-movies-app.azurestaticapps.net/remote.js',
    viewMovie: process.env.REMOTE_VIEWMOVIE_URL || 'https://staging-view-movie-app.azurestaticapps.net/remote.js',
  },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = remoteUrls[environment];

