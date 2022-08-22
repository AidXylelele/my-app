import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profileSlice';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/25578`)
      .then((response) => {
        this.props.onSetUserProfile(response.data);
        //  this.props.onSetNewUsers(response.data.items);
        //  this.props.onSetTotalUsersCount(response.data.totalCount);
      });
  }
  render() {
    return <Profile {...this.props} profileOfUser={this.props.profileOfUser} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profileOfUser: state.profilePage.profileOfUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserProfile: (item) => {
      dispatch(setUserProfile({ item }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
