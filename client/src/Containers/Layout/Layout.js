import React, { useState } from 'react';
import styles from './Layout.module.scss';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import LeftSidebar from '../../Components/Sidebars/LeftSidebar/LeftSidebar';
import RightSidebar from '../../Components/Sidebars/RightSidebar/RightSidebar';

const Layout = (props) => {
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);

    const onClickBars = () => {
        setShowRightSidebar(false);
        setShowLeftSidebar(!showLeftSidebar);
    }
    const onClickShoppingCart = () => {
        setShowLeftSidebar(false);
        setShowRightSidebar(!showRightSidebar);
    }
    const onClickBackdrop = () => {
        setShowLeftSidebar(false);
        setShowRightSidebar(false);
    }
    const onClickCloseArrow = () => {
        setShowRightSidebar(false);
    }
    return <React.Fragment>
        <LeftSidebar
            show={showLeftSidebar}
            onClickBackdrop={onClickBackdrop}
        />
        <RightSidebar 
            show={showRightSidebar}
            onClickCloseArrow={onClickCloseArrow}
            onClickBackdrop={onClickBackdrop}
        />
        <NavBar
            onClickBars={onClickBars}
            onClickShoppingCart={onClickShoppingCart}
        />
        <div className={styles.Main}>
            {props.children}
        </div>
        <Footer />
    </React.Fragment>
}

export default Layout;