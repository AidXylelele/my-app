import React from 'react';
import MyPostsContainer from './My Posts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profileOfUser}
        userStatus={props.userStatus}
        onUpdateUserStatus={props.onUpdateUserStatus}
        userSkills={props.userSkills}
        onUpdateUserSkills={props.onUpdateUserSkills}
        isMyPage={props.isMyPage}
      />
      <MyPostsContainer isMyPage={props.isMyPage} />
    </div>
  );
};

export default Profile;
