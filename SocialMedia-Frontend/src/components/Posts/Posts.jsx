// import React, { useEffect } from 'react'
// import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
// import Post from '../Post/Post'
// import { useDispatch,useSelector } from 'react-redux'
// import { getTimelinePosts } from '../../actions/postAction'
// const Posts = () => {

//   const dispatch = useDispatch()
//   const {user} = useSelector((state)=>state.authReducer.authData)
//   const {posts,loading} = useSelector((state)=>state.postReducer)

//   useEffect(()=>
//   {
//     dispatch(getTimelinePosts(user._id))
//   },[])

//   return (
//     <div className="Posts">
//         {posts.map((post, id)=>{
//             return <Post data={post} id={id}/>
//         })}
//     </div>
//   )
// }

// export default Posts


import React, { useEffect } from "react";
import { getTimelinePosts } from '../../actions/postAction'
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;