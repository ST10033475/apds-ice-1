import React, {useEffect, useState} from "React";
import {Link} from "react-router-dom";

const Post = (props) => (
    <tr>
        <td>{props.post.user}</td>
        <td>{props.post.content}</td>
        <td>{props.post.image &&(<img scr={'data:image/jpeg;base64,${props}'}
        alt="Post Image"
        style={{maxWidth: '100px', maxHeight: '100px', objectFit: 'cover'}}/>)}</td>
        <td>
            <button className="btn btn-link" onClick={() => {
                props.deletePost(props.post._id);
            }}>
                Delete</button>
        </td>
    </tr>
);

export default function PostList(){
   const  [posts, setPosts] = useState([]);
   useEffect(() => {
    async function getPosts(){
        const response = await fetch('https://localhost:3001/post/');

        if(!response.ok){
            const message = 'An error occured: ${response.statusText}' ;
            window.alert(message);
            return;
        }
        const posts = await response.json;
        setPosts(posts);
    }
    getPosts();
    return;
   }, [posts.length]);

   async function deletePost(id) {
    const token = localStorage.getItem("jwt");
    await fetch('https://localhost:3001/post/${id}',{
        method: "DELETE",
        headers:{
            "Authorization": 'Bearer ${token)',
        },
        
    });

    const newPosts = posts.filter((e1) => e1.id !== id);
    setPosts(newPosts);
   }

   function PostList(){
    return posts.map((post) => {
        return (
           <Post post={post}
           deletePost={() => deletePost(post._id)}
           key ={post.id}/>
        );
    });
}
return( <body>
    <div className="container">
        <h3 className="header">APDS Notice Board</h3>
        <table className="table table-striped" style={{marginTop:20}}>
            <thead>
                <tr>
                <th>User</th>
                <th>Caption</th>
                <th>Image</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>{PostList()}</tbody>
        </table>
    </div>
</body>
)
}
