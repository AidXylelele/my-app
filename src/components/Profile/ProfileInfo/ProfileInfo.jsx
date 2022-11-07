import React from 'react';
import PreLoader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import Status from './Status/Status';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <PreLoader />;
  }

  return (
    <div className={styles.wrapper}>
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
          <div
            className={styles.userName}
          >{`${props.profile.name} ${props.profile.surname}`}</div>
          {!props.userStatus && !props.isMyPage ? null : (
            <span className={styles.containerOfStatus}>
              <p className={styles.beforeStatus}>Status:</p>
              <Status
                myUserId={props.profile.id}
                userStatus={props.userStatus}
                onUpdateUserStatus={props.onUpdateUserStatus}
                isMyPage={props.isMyPage}
              />
            </span>
          )}
          <div>
            <span className={styles.containerOfJob}>
              <p className={styles.beforeLookingForAJob}>Looking for a job:</p>
              <div>{props.profile.lookingForAJob ? `✅` : `❌`}</div>
            </span>
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
