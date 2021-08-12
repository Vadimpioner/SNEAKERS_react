import React from 'react';
import ContentLoader from 'react-content-loader';
import './cardStyles.scss';
import { AppContext } from '../../App';

function Card({
    id,
    images,
    title,
    price,
    onPluse,
    onFavorites,
    favorited = false,
    added = false,
    loading = false,
}) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isLiked, setIsLiked] = React.useState(favorited);

    const onClickPluse = () => {
        onPluse({ id, parentId: id, images, title, price });
    };

    const onClickHeart = () => {
        setIsLiked(!isLiked);
        onFavorites({ id, images, title, price });
    };

    return (
        <div className="content__card">
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={152}
                    height={222}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="152" height="128" />
                    <rect x="0" y="167" rx="5" ry="5" width="152" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="230" rx="5" ry="5" width="80" height="32" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    {onFavorites && (
                        <img
                            className="heart"
                            onClick={onClickHeart}
                            src={
                                isLiked ? 'SNEAKERS/img/heart-active.svg' : 'SNEAKERS/img/heart.svg'
                            }
                            alt="heart"
                        />
                    )}
                    <img className="cross" src={images} alt="sneakers-1" />
                    <div className="name">{title}</div>
                    <div className="content__card-price">
                        <div className="price">
                            <p className="text-1">Цена:</p>
                            <p className="text-2">{price} руб.</p>
                        </div>
                        <div className="pluse">
                            {onPluse && (
                                <img
                                    onClick={onClickPluse}
                                    src={
                                        isItemAdded(id)
                                            ? 'SNEAKERS/img/pluse-active.svg'
                                            : 'SNEAKERS/img/pluse.svg'
                                    }
                                    alt="Pluse"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
