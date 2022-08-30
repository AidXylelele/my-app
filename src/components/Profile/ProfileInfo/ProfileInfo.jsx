import React from 'react';
import PreLoader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import Status from './Status';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <PreLoader />;
  }
  return (
    <div>
      <div className={styles.profileInfoWrapper}>
        <img
          className={styles.avatar}
          alt="There is an avatar"
          src={
            props.profile.photos.large
              ? props.profile.photos.large
              : 'https://yt3.ggpht.com/ytc/AKedOLT8IWBS5QKF7ED2_Cq-4tX5q9U165rawWgvjTHB=s900-c-k-c0x00ffffff-no-rj'
          }
        ></img>
        <div className={styles.descriptionBlock}>
          <div>
            <h3>{props.profile.fullName}</h3>
          </div>
          <div>
            <Status
              userStatus={props.userStatus}
              onUpdateUserStatus={props.onUpdateUserStatus}
            />
          </div>
          <div>
            <p> Looking for a job: {props.profile.lookingForAJob.toString()}</p>
          </div>
          <div>
            <p>
              Description of skills: {props.profile.lookingForAJobDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
