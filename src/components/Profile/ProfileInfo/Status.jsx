import React from 'react';
class Status extends React.Component {
  state = {
    isActive: false,
    userStatus: this.props.userStatus,
  };

  toggleInput = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  onChangeInput = (e) => {
    this.setState({
      userStatus: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        {this.state.isActive ? (
          <span>
            <input
              autoFocus={true}
              onBlur={() => {
                this.toggleInput();
                this.props.onUpdateUserStatus(this.state.userStatus);
              }}
              onChange={this.onChangeInput}
              type="text"
              value={this.state.userStatus}
              placeholder="Enter status"
            />
          </span>
        ) : (
          <span onDoubleClick={this.toggleInput}>
            {this.props.userStatus
              ? this.props.userStatus
              : 'Here is your status!'}
          </span>
        )}
      </div>
    );
  }
}

export default Status;
