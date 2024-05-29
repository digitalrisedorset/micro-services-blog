import CommentItem from './CommentForm'

export default function CommentList({comments}) {
    return (
        <div>
            <h1>Comments</h1>
            <ul>
            {comments.length>0 && comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
            </ul>
        </div>
    )
}