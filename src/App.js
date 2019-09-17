import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

// import Login from './Login';
// import checkAuth from './checkAuth'



function App() {

  const [data, setData] = useState(null)
  const [minute, setMinute] = useState(7)

  useEffect(() => {
    
    const timer = setInterval(() => {
      setMinute(minute + 1)
    }, 1000 * 20)

    return () => {
      clearInterval(timer)
    }
  })

  
  useEffect(() => {
    const fetchData = async () => {

      const url = `/precipdata/201909${minute.toString().length < 2 ? `0${minute}` : minute}0900`

      console.log(url)

      const response = await fetch(url)
      const json = await response.json()
      console.log(json)
      localStorage.setItem('ourdata', JSON.stringify(json))
      setData(json)

      // setData(JSON.parse(localStorage.getItem('ourdata')))
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="mapcontainer">
        <Map data={data} />
      </div>
    </>
  );
}

export default App;
