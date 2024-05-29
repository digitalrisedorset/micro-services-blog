import axios from 'axios'

export default function CommentItem({ comment}) {
    const { id, content, status} = comment
    const statusNeedModeration = status!=='allowed'

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:4003/posts/approve/${id}`, {})
    }

    return (
        <li key={id} style={{color: !statusNeedModeration ? 'green' : 'red'}}>{content}
            {statusNeedModeration && (
                <button className="btn btn-primary" onClick={handleSubmit}>Approve</button>
            )}
        </li>
    )
}