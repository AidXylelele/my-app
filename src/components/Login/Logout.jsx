import React from 'react';

const Logout = (props) => {
  const { isAuthed } = props;
  return (
    <button onClick={() => props.onLogout({ current: isAuthed })}>
      Logout
    </button>
  );
};

export default Logout;
