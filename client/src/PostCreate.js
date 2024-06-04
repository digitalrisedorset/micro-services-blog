import {useState} from 'react'
import axios from 'axios'

export default function PostCreate() {
    const [title, setTitle] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('title submitted', title)
        await axios.post('http://localhost:4000/posts', { title})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    )
}