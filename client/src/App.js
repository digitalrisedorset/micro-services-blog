import CreatePost from './PostCreate'
import PostList from "./PostList";

export default function App() {
    return (
        <div className="container">
            <h1>Create Post</h1>
            <CreatePost />
            <PostList />
        </div>
    )
}