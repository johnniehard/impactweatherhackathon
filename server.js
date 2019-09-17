import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'

import auth, { requireAuth, checkAuth } from './api/auth'

const app = express()
app.use(compression())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

app.use(checkAuth)
app.use('/auth', auth)

app.get('/ping', requireAuth, (req, res) => {
    res.send('pong')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 5000)