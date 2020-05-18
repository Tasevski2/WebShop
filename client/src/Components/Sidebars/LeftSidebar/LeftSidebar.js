import React from 'react';
import styles from './LeftSidebar.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../UI/Logo/Logo';
import GoogleBtn from '../../UI/Buttons/SocialMedia/GoogleBtn';
import FacebookBtn from '../../UI/Buttons/SocialMedia/FacebookBtn';
import BiljanaBtn from '../../UI/Buttons/SocialMedia/BiljanaBtn';

const LeftSidebar = (props) => {
    let chosenClass = { style: styles.Close };
    if (props.show) {
        chosenClass.style = styles.Open;
    }

    return props.show ? <React.Fragment>
        <Backdrop
            show={props.show}
            hide={props.onClickBackdrop}
        />
        <div className={chosenClass.style}>
            <div className={styles.Header}>
                Бутик Билјана
            </div>
            <div className={styles.Main}>
                <ul>
                    <li>
                        <BiljanaBtn />
                    </li>
                    <li>
                        <GoogleBtn />
                    </li>
                    <li>
                        <FacebookBtn />
                    </li>
                    <li><a href="!#">Производи</a></li>
                    <li><a href="!#">Моја кошничка</a></li>
                    <li><a href="!#">За Нас</a></li>
                    <li><a href="!#">Одјави се</a></li>
                </ul>
                <div className={styles.Footer}>
                    <div>
                        <Logo />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment> : null;
}

export default LeftSidebar;