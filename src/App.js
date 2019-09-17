import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Login from './Login';
import checkAuth from './checkAuth'

function Main({ history }) {

  const [auth, setAuth] = useState(false)
  const [ping, setPing] = useState('ping')

  useEffect(() => {
    checkAuth(history, () => {
      setAuth(true)
    })
  }, [history])

  useEffect(() => {
    if (auth && ping !== 'pong') {
      async function getPing() {
        const pong = await (await fetch('/ping', {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })).text()
        setPing(pong)
      }
      getPing()
    }
  }, [auth])

  if (!auth) {
    return <div className="App" />
  }

  return (
    <div className="App">
      <p>{ping}</p>
    </div>
  )
}

function App() {

  return (
    <Router>


      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />

        <Route render={() => <h1>not found</h1>} />
      </Switch>
    </Router >
  );
}

export default App;
