import {useState} from 'react'
import axios from 'axios'

export default function CommentCreate({postId}) {
    const [comment, setComment] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content: comment
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New comment</label>
                    <input className="form-control"
                           value={comment}
                           onChange={e => setComment(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Comment</button>
            </form>
        </div>
    )
}