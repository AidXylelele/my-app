import React from "react";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div className={styles.profileInfoWrapper}>
        <img className={styles.avatar} src='https://yt3.ggpht.com/ytc/AKedOLT8IWBS5QKF7ED2_Cq-4tX5q9U165rawWgvjTHB=s900-c-k-c0x00ffffff-no-rj'></img>
        <div className={styles.descriptionBlock}>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
