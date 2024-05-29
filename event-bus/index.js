const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body

    axios.post('http://localhost:4000/events', event).catch(e => {
        console.log('event error', e)
    })
    axios.post('http://localhost:4001/events', event).catch(e => {
        console.log('event error', e)
    })
    axios.post('http://localhost:4002/events', event).catch(e => {
        console.log('event error', e)
    })
    axios.post('http://localhost:4003/events', event).catch(e => {
        console.log('event error', e)
    })

    res.send({status: 'ok'})
})

app.listen(5000, () => {
    console.log('Listening on 5000');
});