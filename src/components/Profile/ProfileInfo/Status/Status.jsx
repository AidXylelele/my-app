import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Status.module.css';

const Status = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [localUserStatus, setLocalUserStatus] = useState(props.userStatus);
  const { userStatus, isMyPage, myUserId } = props;

  useEffect(() => {
    setLocalUserStatus(userStatus);
  }, [userStatus, setLocalUserStatus]);

  const toggleInput = () => {
    if (isMyPage) {
      setIsActive(!isActive);
    }
  };

  const onChangeInput = (e) => {
    setLocalUserStatus(e.currentTarget.value);
  };

  return (
    <div>
      {isActive ? (
        <span>
          <input
            className={styles.statusInput}
            autoFocus={true}
            onBlur={() => {
              toggleInput();
              props.onUpdateUserStatus(localUserStatus, myUserId);
            }}
            onChange={onChangeInput}
            type="text"
            value={localUserStatus}
            placeholder="Enter status"
          />
        </span>
      ) : isMyPage ? (
        <span className={styles.status} onDoubleClick={toggleInput}>
          {props.userStatus ? props.userStatus : 'Here is your status!'}
        </span>
      ) : (
        <span className={styles.status}>{props.userStatus}</span>
      )}
    </div>
  );
};

export default Status;
