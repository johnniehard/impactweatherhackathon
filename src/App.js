import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

// import Login from './Login';
// import checkAuth from './checkAuth'


function App() {

  return (
    <>
      <div className="mapcontainer">
        <Map />
      </div>
    </>
  );
}

export default App;
