import React from 'react';
import styles from './SocialMedia.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const FacebookBtn = () => {
    return <a className={styles.FacebookBtn} href="!#">
        <FontAwesomeIcon icon={faFacebookF}/><span>Најави се со Facebook</span>
    </a>
}

export default FacebookBtn;