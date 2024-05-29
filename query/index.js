const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const postsForQuery = {};

app.get('/posts', (req, res) => {
    res.send(postsForQuery)
})

app.post('/events', (req, res) => {
    console.log(`event received type: ${req.body.type}`)

    const { type, data } = req.body

    if (type === 'post_added') {
        const { id, title } = data

        const comments = []

        postsForQuery[id] = {
            id,
            title,
            comments
        }
    }

    if (type === 'comment_added') {
        const { postId, id, content, allowed } = data

        if (postsForQuery[postId] === undefined) {
            throw new Error(`\`Post id ${postId} does not exist`)
        }

        const comments = postsForQuery[postId].comments || []

        comments.push({
            id,
            content,
            allowed
        })

        postsForQuery[postId].comments =  comments
    }

    if (type === 'comment_moderated') {
        const { id, status } = data

        const posts = Object.values(postsForQuery)

        posts.map(post => {
            post.comments.map(comment => {
                if (comment.id === id) {
                    comment.status = status
                }
            })
        })
    }

    res.send({})
})


app.listen(4002, () => {
    console.log('Listening on 4002');
});