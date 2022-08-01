import React from "react";
import MyPosts from "./My Posts/MyPosts";
import styles from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts postData={props.state.postsData} />
    </div>
  );
};

export default Profile;
