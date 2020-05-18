import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className="p-grid" id={styles.divs}>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-3">
                    <input 
                    type="checkbox" 
                    id="check1" 
                    name="checkbox1"  
                    className={styles.CheckBox}></input>
                    <label className={styles.ColumnName} data-after-content="^" htmlFor="check1">ПРОДАВНИЦА</label>
                    <ul className={styles.List}>
                        <li><a href="!#">Сите Продукти</a></li>
                        <li><a href="!#">Помош</a></li>
                    </ul>
                </div>

                <div className="p-col-12 p-md-6 p-lg-6 p-xl-3">
                    <input 
                    type="checkbox" 
                    id="check2" 
                    name="checkbox2" 
                    className={styles.CheckBox}></input>
                    <label className={styles.ColumnName} data-after-content="^" htmlFor="check2">ОКОЛУ КОМПАНИЈАТА</label>
                    <ul className={styles.List}>
                        <li><a href="!#">За Нас</a></li>
                        <li><a href="!#">Полиса на компанијата</a></li>
                        <li><a href="!#">Услови на услуга</a></li>
                    </ul>
                </div>

                <div className="p-col-12 p-md-6 p-lg-6 p-xl-3">
                    <input 
                    type="checkbox" 
                    id="check3"
                     name="checkbox3" 
                     className={styles.CheckBox}></input>
                    <label className={styles.ColumnName} data-after-content="^" htmlFor="check3">АКАУНТ</label>
                    <ul className={styles.List}>
                        <li><a href="!#">Најави се</a></li>
                        <li><a href="!#">Креирај акаунт</a></li>
                    </ul>
                </div>

                <div className="p-col-12 p-md-6 p-lg-6 p-xl-3">
                    <input 
                    type="checkbox" 
                    id="check4" 
                    name="checkbox4" 
                    className={styles.CheckBox}></input>
                    <label className={styles.ColumnName} data-after-content="^" htmlFor="check4">КОНТАКТ</label>
                    <ul className={styles.List}>
                        <li><a href="!#">viktor-tasevski@hotmail.com</a></li>
                        <li><a href="!#">Facebook</a></li>
                        <li><a href="!#">Instagram</a></li>
                    </ul>
                </div>

            </div>

            <div className={styles.Signature}>
                <span>&copy; Butik Biljana</span>
            </div>
        </div>
    )
}

export default Footer;