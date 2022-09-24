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
        isMyPage={props.isMyPage}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
