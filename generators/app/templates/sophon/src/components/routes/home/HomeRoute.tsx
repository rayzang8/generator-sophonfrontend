import React, {useEffect, useState} from 'react';
import logo from '#assets/images/logo.svg';
import styles from './homeRoute.module.scss';
import lessStyles from './homeRoute.module.less';
import './homeRoute.scss';
import './homeRoute.less';

export const HomeRoute = ():React.ReactElement => {
    // console.log(aaa);
    const [testState, setTestState] = useState<string>('');
    useEffect(() => {
        setTestState('Hellow Sophon!');
    }, []);
    // if (testState) {
    //     const [oppsState] = useState<boolean>(true);
    // }
    return (
        <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <p className={styles.test}>
            Edit <code className="test2">src/App.tsx</code> and save to reload.
          </p>
          <a
            className="app-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={lessStyles.test3}>{testState}</span>
          </a>
        </header>
      </div>
    );
};
