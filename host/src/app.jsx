import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

const _ = React; 

const App = () => {
  return (
    <BrowserRouter>
      <Routing />      
    </BrowserRouter>
  );

return (
  <BrowserRouter>
    <nav className="navigation-menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/mfe1">MFE 1</a></li>
        <li><a href="/mfe2">MFE 2</a></li>
      </ul>
    </nav>
    <Routing />
  </BrowserRouter>
);
};

export default App;