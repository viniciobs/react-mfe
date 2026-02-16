import React from "react";
import { Route, Routes } from "react-router";
import { useParams } from "react-router-dom";
import importRemote from "./dynamic-remotes";

const webpack = require('webpack');

// Remote URLs configuration
const getRemoteUrl = (remoteName) => {
  console.log("olha p tu ver " + webpack.process.env.NODE_ENV);
  // Check if we're in production mode
  const isProduction = webpack.process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Use environment variables or fallback URLs for production
    const remoteUrls = {
      home: window.REMOTE_HOME_URL || process.env.REMOTE_HOME_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/home/remote.js',
      listMovies: window.REMOTE_LISTMOVIES_URL || process.env.REMOTE_LISTMOVIES_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/list-movies/remote.js',
      viewMovie: window.REMOTE_VIEWMOVIE_URL || process.env.REMOTE_VIEWMOVIE_URL || 'https://mfestaticsite.z15.web.core.windows.net/remotes/view-movie/remote.js',
    };
    return remoteUrls[remoteName];
  }

  // Development URLs
  const devUrls = {
    home: 'http://localhost:3001/remote.js',
    listMovies: 'http://localhost:3002/remote.js',
    viewMovie: 'http://localhost:3003/remote.js',
  };
  return devUrls[remoteName];
};

// Home Page
const HomePage = React.lazy(() =>
  importRemote({
    url: getRemoteUrl('home'),
    scope: "remote_home",
    module: "Application",
  })
);

// List Movie Page
const ListMoviesPage = React.lazy(() =>
  importRemote({
    url: getRemoteUrl('listMovies'),
    scope: "remote_listmovies",
    module: "Application",
  })
);

// View Movie Page
const ViewMovieRemote = React.lazy(() =>
  importRemote({
    url: getRemoteUrl('viewMovie'),
    scope: "remote_viewmovie",
    module: "Application",
  })
);
const ViewMoviePage = () => {
  let { id } = useParams();
  return (<ViewMovieRemote id={id} />);
};

const NotFoundPage = () => {
  return <>Page not found...</>;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movies" element={<ListMoviesPage />} />
    <Route path="/movies/:id" element={<ViewMoviePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;