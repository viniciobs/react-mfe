// Remote URLs configuration for different environments
const remoteUrls = {
  development: {
    home: 'http://localhost:3001/remote.js',
    listMovies: 'http://localhost:3002/remote.js',
    viewMovie: 'http://localhost:3003/remote.js',
  },
  production: {
    home: process.env.REMOTE_HOME_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/home/remote.js',
    listMovies: process.env.REMOTE_LISTMOVIES_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/list-movies/remote.js',
    viewMovie: process.env.REMOTE_VIEWMOVIE_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/view-movie/remote.js',
  }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = remoteUrls[environment];
