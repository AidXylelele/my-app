import React from "react";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="https://www.wonderplugin.com/wp-content/uploads/2019/05/tutorial-city-900x288.jpg"></img>
      </div>
      <div className={styles.descriptionBlock}>ava+dsc</div>
    </div>
  );
};

export default ProfileInfo;
