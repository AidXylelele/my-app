import React from 'react';
import preLoader from './../../../components/assets/images/preLoader.svg';

const PreLoader = (props) => {
  return (
    <div>
      <img alt="There must be a preloader!" src={preLoader} />
    </div>
  );
};

export default PreLoader;
