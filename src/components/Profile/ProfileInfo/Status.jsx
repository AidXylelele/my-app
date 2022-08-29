import React from 'react';
class Status extends React.Component {
  state = {
    isActive: false,
  };

  toggleInput = () => {
    console.log(this.state.isActive);
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    return (
      <div>
        {this.state.isActive ? (
          <span>
            <input
              autoFocus={true}
              onBlur={this.toggleInput}
              type="text"
              placeholder="Enter status"
            />
          </span>
        ) : (
          <span onDoubleClick={this.toggleInput}>Here is your status!</span>
        )}
      </div>
    );
  }
}

export default Status;
