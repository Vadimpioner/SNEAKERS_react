import React from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    'https://60d4fbfa943aa6001776877b.mockapi.io/Order',
                );
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
            }
        })();
    }, []);
    return (
        <div className="content">
            <div className="content__search">
                <h1>Мои заказы</h1>
            </div>
            <div className="wrapper">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card
                        key={index} // уникальный индификатор
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;
