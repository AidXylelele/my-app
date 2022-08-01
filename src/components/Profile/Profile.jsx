import React from "react";
import MyPosts from "./My Posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        postData={props.profilePage.postsData}
        addPost={props.addPost}
        updateNewPostChange={props.updateNewPostChange}
        newPostText={props.profilePage.newPostText}
      />
    </div>
  );
};

export default Profile;
