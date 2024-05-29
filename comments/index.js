const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const { randomBytes } = require('crypto');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || []

    res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || []
    comments.push({
        id: commentId,
        content
    })
    commentsByPostId[postId] = comments

    axios.post('http://localhost:5000/events', {
        type: 'comment_added',
        data: {
            postId,
            id: commentId,
            content
        }
    })

    res.status(201).send(commentsByPostId);
});

app.post('/events', (req, res) => {
    console.log(`event received type: ${req.body.type}`)

    if (req.body.type === 'comment_moderated') {

    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4001');
});