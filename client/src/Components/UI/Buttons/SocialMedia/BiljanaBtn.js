import React from 'react';
import styles from './SocialMedia.module.scss';
import Logo from '../../Logo/Logo';

const BiljanaBtn = () => {
    return <a className={styles.BiljanaBtn} href="!#">
        <div className={styles.Logo}><Logo /></div><span>Најави се</span>
    </a>
}

export default BiljanaBtn;