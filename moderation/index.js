const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentStatus = {}

app.post('/posts/approve/:commentId', (req, res) => {
    const commentId = req.params.commentId;

    commentStatus[commentId] = {
        status: 'allowed'
    }

    axios.post('http://localhost:5000/events', {
        type: 'comment_moderated',
        data: {
            id: commentId,
            status: 'allowed'
        }
    })

    res.status(201).send(commentStatus);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log(`event received type: ${type}`)

    if (req.body.type === 'comment_added') {
        const { id, content } = data
        const status = content.includes('orange')?'awaiting moderation':'allowed'

        commentStatus[id] = {
            status
        }

        axios.post('http://localhost:5000/events', {
            type: 'comment_moderated',
            data: {
                id,
                status: status
            }
        })

        res.status(201).send({});
    }

    res.send({})
})

app.listen(4003, () => {
    console.log('Listening on 4003');
});