// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { followUser, unfollowUser } from "../../actions/userAction";


// function User({person}) {

//   const dispatch = useDispatch()
//   const{user} = useSelector((state)=>state.authReducer.authData);
//   const [following,setfollowing] = useState(person.following.includes(user._id))
//   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

//   const handleFollow = (e)=>
//   {
//     following ?
//       dispatch(unfollowUser(person._id,user)):
//       dispatch(followUser(person._id,user));

//       setfollowing((prev)=>!prev)

//   }
//   return (
//     <div className="follower">
//       <div>
//         <img src={
//           person.profilePicture
//             ? serverPublic + person.profilePicture
//             : serverPublic + "defaultProfile.png"
//         } alt="" className="followerImage" />
//         <div className="name">
//           <span>{person.firstname}</span>
//           <span>{person.username}</span>
//         </div>
//       </div>
//       <button className="button fc-button" onClick={handleFollow}>{following ? "Unfollow":"Follow"}</button>
//     </div>
//   );
// }

// export default User;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;