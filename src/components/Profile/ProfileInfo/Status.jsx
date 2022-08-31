import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Status = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [localUserStatus, setLocalUserStatus] = useState(props.userStatus);
  const { userStatus } = props;

  useEffect(() => {
    setLocalUserStatus(userStatus);
  }, [userStatus, setLocalUserStatus]);

  const toggleInput = () => {
    setIsActive(!isActive);
  };

  const onChangeInput = (e) => {
    setLocalUserStatus(e.currentTarget.value);
  };

  return (
    <div>
      {isActive ? (
        <span>
          <input
            autoFocus={true}
            onBlur={() => {
              toggleInput();
              props.onUpdateUserStatus(localUserStatus);
            }}
            onChange={onChangeInput}
            type="text"
            value={localUserStatus}
            placeholder="Enter status"
          />
        </span>
      ) : (
        <span onDoubleClick={toggleInput}>
          {props.userStatus ? props.userStatus : 'Here is your status!'}
        </span>
      )}
    </div>
  );
};

export default Status;
