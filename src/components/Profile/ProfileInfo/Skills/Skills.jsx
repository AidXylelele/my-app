import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Skills.module.css';

const Skills = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [localUserSkills, setLocalUserSkills] = useState(props.userSkills);
  const { userSkills, isMyPage, myUserId } = props;

  useEffect(() => {
    setLocalUserSkills(userSkills);
  }, [userSkills, setLocalUserSkills]);

  const toggleInput = () => {
    if (isMyPage) {
      setIsActive(!isActive);
    }
  };

  const onChangeInput = (e) => {
    setLocalUserSkills(e.currentTarget.value);
  };

  return (
    <div>
      {isActive ? (
        <span>
          <input
            className={styles.skillsInput}
            autoFocus={true}
            onBlur={() => {
              toggleInput();
              props.onUpdateUserSkills(localUserSkills, myUserId);
            }}
            onChange={onChangeInput}
            type="text"
            value={localUserSkills}
            placeholder="Enter skills"
          />
        </span>
      ) : isMyPage ? (
        <span className={styles.skills} onDoubleClick={toggleInput}>
          {props.userSkills ? props.userSkills : 'None'}
        </span>
      ) : (
        <span className={styles.skills}>{props.userSkills}</span>
      )}
    </div>
  );
};

export default Skills;
