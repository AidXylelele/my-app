import React from 'react';
import preLoader from './../../../components/assets/images/preLoader.svg';
import styles from './Preloader.module.css';

const PreLoader = (props) => {
  return (
    <div className={styles.preloader}>
      <img alt="There must be a preloader!" src={preLoader} />
    </div>
  );
};

export default PreLoader;
