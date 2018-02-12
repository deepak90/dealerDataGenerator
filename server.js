const express = require('express')
const app = express()

const dealerObj = require('./dealers')

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/dealers',(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dealerObj(50, 3)));
})

app.listen(3001, () => console.log('listening on port 3001'))