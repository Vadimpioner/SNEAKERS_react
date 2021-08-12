import React from 'react';
import { AppContext } from '../App';

const DelInfo = ({ image, title, description }) => {
    const { setCardOpened } = React.useContext(AppContext);
    return (
        <div className="box">
            <img src={image} alt="box" />
            <b>{title}</b>
            <span>{description}</span>
            <button onClick={() => setCardOpened(false)}>
                Вернуться назад
                <img src="img/strelka.svg" alt="strelka" />
            </button>
        </div>
    );
};

export default DelInfo;
