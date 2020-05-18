import React from 'react';
import styles from './RightSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import Backdrop from '../../UI/Backdrop/Backdrop';
import OrderBtn from '../../UI/Buttons/Order/OrderBtn';
import maska from '../../../assets/imgs/maska.png';
import zenska from '../../../assets/imgs/zenska.png'
import detska from '../../../assets/imgs/detska.png'

const RightSidebar = (props) => {

    let chosenClass = { style: styles.Close };
    if (props.show) {
        chosenClass.style = styles.Open;
    }

    return props.show ? <React.Fragment>
        <div className={styles.Backdrop}>
            <Backdrop
                show={props.show}
                hide={props.onClickBackdrop}
            />
        </div>
        <div className={chosenClass.style}>
            <div className={styles.Header}>
                <h2>Моја Кошничка</h2>
                <span><FontAwesomeIcon icon={faLongArrowAltRight} size='2x' onClick={props.onClickCloseArrow} /></span>
            </div>
            <div className={styles.Main}>
                <div className={styles.Card}>
                    <div className={styles.Image}>
                        <img src={maska} alt="maska_maica" />
                    </div>
                    <div className={styles.Description}>
                        <div className={styles.Top}>
                            <span>Машка Безбојна</span>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <p><i>Бела машка маица 100% памук</i></p>
                        <p>Величина: XL</p>
                        <div className={styles.Numbers}>
                            <input type="text" defaultValue="2" />
                            <i> @ </i>
                            <span>
                                260 ден.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.Card}>
                    <div className={styles.Image}>
                        <img src={zenska} alt="zenska_maica" />
                    </div>
                    <div className={styles.Description}>
                        <div className={styles.Top}>
                            <span>Женска Розева</span>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <p><i>Розева женска маица 50% памук 50%ликра</i></p>
                        <p>Величина: XS</p>
                        <div className={styles.Numbers}>
                            <input type="text" defaultValue="1" />
                            <i> @ </i>
                            <span>
                                130 ден.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.Card}>
                    <div className={styles.Image}>
                        <img src={detska} alt="detska_maica" />
                    </div>
                    <div className={styles.Description}>
                        <div className={styles.Top}>
                            <span>Џокер</span>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <p><i>Детска џокер маица 100% памук</i></p>
                        <p>Величина: М</p>
                        <div className={styles.Numbers}>
                            <input type="text" defaultValue="3" />
                            <i> @ </i>
                            <span>
                                360 ден.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.Footer}>
                <div className={styles.Total}>
                    <h4>Вкупно</h4>
                    <span>600 ден.</span>
                </div>
                <div className={styles.OrderBtn}>
                    <OrderBtn />
                </div>
            </div>
        </div>
    </React.Fragment> : null
}

export default RightSidebar;