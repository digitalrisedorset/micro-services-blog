import {useEffect, useState} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from "./CommentList";

export default function PostList() {
    const [posts, setPosts] = useState([])

    const fetchPost = async () => {
        const result = await axios.get('http://localhost:4002/posts')
        setPosts(result.data)
    }

    useEffect(() => {
        fetchPost()
    }, []);

    const postsList = Object.values(posts)

    return (
        <div>
            <h1>Posts</h1>
            {postsList.length>0 && postsList.map(post => (
                <div key={post.id} className="card" style={{width: '30%', marginBottom: '20px'}}>
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentList postId={post.id} comments={post.comments} />
                        <CommentCreate postId={post.id}/>
                    </div>
                </div>
            ))}
        </div>
    )
}