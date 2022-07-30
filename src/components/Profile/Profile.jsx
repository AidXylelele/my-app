import React from "react";
import MyPosts from "./My Posts/MyPosts";
import styles from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
  const postData = [
    { id: 1, message: "Hello, world!", likesCount: 12 },
    { id: 2, message: "It is my second post", likesCount: 11 },
  ];

  return (
    <div>
      <ProfileInfo />
      <MyPosts postData={postData}/>
    </div>
  );
};

export default Profile;
