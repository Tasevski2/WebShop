import React from 'react';
import styles from './SocialMedia.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleBtn = () => {
    return <a className={styles.GoogleBtn} href="!#">
        <FontAwesomeIcon icon={faGoogle}/><span>Најави се со Google</span>
    </a>
}

export default GoogleBtn;