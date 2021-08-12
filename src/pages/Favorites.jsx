import React from 'react';
import Card from '../components/Card';
import { AppContext } from '../App';

function Favorites({ onAddToFavorites }) {
    const { favorites } = React.useContext(AppContext);
    return (
        <div className="content">
            <div className="content__search">
                <h1>Мои закладки</h1>
            </div>
            <div className="wrapper">
                {favorites.map((item, index) => (
                    <Card
                        key={index} // уникальный индификатор
                        id={item.id}
                        images={item.images}
                        title={item.title}
                        price={item.price}
                        favorited={true}
                        onFavorites={onAddToFavorites}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
