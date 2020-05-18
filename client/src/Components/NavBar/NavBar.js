import React from 'react';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Logo from '../UI/Logo/Logo';

const NavBar = (props) => {
    
    return (
        <div className={styles.NavBar}>
            <div className={styles.Bars}>
                <FontAwesomeIcon icon={faBars} size='2x' onClick={props.onClickBars}/>
            </div>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <div className={styles.SignInCart}>
                <div className={styles.SignIn}>
                    <span className={styles.SignInText}>Sign in</span> <FontAwesomeIcon icon={faUser}/>
                </div>
                <div className={styles.Cart}   onClick={props.onClickShoppingCart}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
            </div>
        </div>
    )
}

export default NavBar;