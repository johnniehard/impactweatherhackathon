import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

// import Login from './Login';
// import checkAuth from './checkAuth'



function App() {

  // const [data, setData] = useState(null)

  
  // useEffect(() => {
  //   console.log('fljdlkfj')
  //   const fetchData = async () => {
  //     // const response = await fetch('/precipdata/201909070900')
  //     // const json = await response.json()
  //     // console.log(json)
  //     // localStorage.setItem('ourdata', JSON.stringify(json))
  //     // setData(json)

  //     setData(JSON.parse(localStorage.getItem('ourdata')))
  //   }

  //   fetchData()
  // }, [])

  return (
    <>
      <div className="mapcontainer">
        <Map />
      </div>
    </>
  );
}

export default App;
