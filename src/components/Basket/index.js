import React from 'react';
import './basketStyles.scss';
import DelInfo from '../DelInfo.jsx';
import { AppContext } from '../../App';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Basket({ closeBasket, onDelete, items = [] }) {
    const { cardItems, setCardItems } = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                `https://60d4fbfa943aa6001776877b.mockapi.io/Order/`,
                { items: cardItems },
            );
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCardItems([]);

            for (let i = 0; i < cardItems.length; i++) {
                const item = cardItems[i];
                await axios.delete('https://60d4fbfa943aa6001776877b.mockapi.io/Card/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Не удалось создать заказ');
        }
        setIsLoading(false);
    };

    // чтобы передать значение по умолчанию запись имеет такой вид
    return (
        <div className="overlay">
            <div className="basket">
                <div className="header">
                    <p className="name">
                        Корзина
                        <img
                            onClick={closeBasket}
                            className="closeBasket"
                            src="img/close.svg"
                            alt="close"
                        />
                    </p>
                    {items.length > 0 ? (
                        <div>
                            <div className="basket__wrapper">
                                {items.map((obj) => (
                                    <div key={obj.id} className="basket__wrapper-sneakers">
                                        <img src={obj.images} alt="sneakers-2" />
                                        <div className="basket__wrapper-text">
                                            <p>{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        <img
                                            onClick={() => onDelete(obj.id)}
                                            src="img/close.svg"
                                            alt="close"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="footer">
                                <div className="price">
                                    <p>Итого: </p>
                                    <span>{totalPrice} руб.</span>
                                </div>
                                <div className="price">
                                    <p>Налог 5%: </p>
                                    <span>{totalPrice * 0.05} руб.</span>
                                </div>
                                <button
                                    disabled={isLoading}
                                    onClick={onClickOrder}
                                    className="greenName">
                                    Оформить заказ
                                    <img src="img/strelka.svg" alt="strelka" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <DelInfo
                            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                            description={
                                isOrderComplete
                                    ? `Ваш заказ  №${orderId} передан курьерской доставке`
                                    : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                            }
                            image={isOrderComplete ? 'img/done.png' : 'img/box.png'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Basket;
