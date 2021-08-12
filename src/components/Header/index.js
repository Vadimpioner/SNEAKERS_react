import React from 'react';
import { Link } from 'react-router-dom';
import './indexStyles.scss';
import { AppContext } from '../../App';

function Header(props) {
    const { cardItems } = React.useContext(AppContext);
    const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);
    return (
        <header>
            <div className="label">
                <Link to="/">
                    <div className="label__logo">
                        <div className="label__logo-img">
                            <img src="img/header-logo.png" alt="logo" className="header-logo" />
                        </div>
                        <div className="label__logo-text">
                            <b>REACT SNEAKERS</b>
                            <span>Магазин лучших кроссовок</span>
                        </div>
                    </div>
                </Link>
                <div className="label__active">
                    <div className="label__active-by">
                        <img
                            onClick={props.onClickCard}
                            src="img/header-by.svg"
                            alt="by"
                            className="header-by"
                        />
                        <span className="header-price">{totalPrice} руб.</span>
                    </div>
                    <div className="label__active-likes">
                        <Link to="/favorites">
                            <img src="img/header-likes.svg" alt="likes" className="header-likes" />
                        </Link>
                    </div>
                    <div className="label__active-profile">
                        <Link to="/orders">
                            <img
                                src="img/header-profile.svg"
                                alt="profile"
                                className="header-profile"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
