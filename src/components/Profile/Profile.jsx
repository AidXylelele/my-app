import React from "react";
import MyPosts from "./My Posts/MyPosts";
import styles from './Profile.module.css'


const Profile = () => {
  return (
    <div className={styles.content}>
      <div>
        <img src="https://www.wonderplugin.com/wp-content/uploads/2019/05/tutorial-city-900x288.jpg"></img>
      </div>
      <div>ava+dsc</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
