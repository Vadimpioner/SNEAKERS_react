import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Basket from './components/Basket';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = React.useState([]);
    const [cardItems, setCardItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cardOpened, setCardOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // useEffect при первом рендере страницы вызови axios и больше не вызывай. Так бы axios срабатываел при каждом изменении состояния любого компанента
    React.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const cardResponse = await axios.get(
                'https://60d4fbfa943aa6001776877b.mockapi.io/Card',
            );
            const favoritesResponse = await axios.get(
                'https://60d4fbfa943aa6001776877b.mockapi.io/favorites',
            );
            const itemsResponse = await axios.get(
                'https://60d4fbfa943aa6001776877b.mockapi.io/items',
            );

            setIsLoading(false);

            setCardItems(cardResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCard = async (obj) => {
        try {
            const findItem = cardItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCardItems((prev) =>
                    prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
                );
                await axios.delete(
                    `https://60d62397943aa60017768e77.mockapi.io/cart/${findItem.id}`,
                );
            } else {
                setCardItems((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    'https://60d62397943aa60017768e77.mockapi.io/cart',
                    obj,
                );
                setCardItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    };

    const onAddToFavorites = async (obj) => {
        // console.log(obj);
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://60d4fbfa943aa6001776877b.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
                const { data } = await axios.post(
                    'https://60d4fbfa943aa6001776877b.mockapi.io/favorites',
                    obj,
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };

    const deleteSneakers = (id) => {
        axios.delete(`https://60d4fbfa943aa6001776877b.mockapi.io/Card/${id}`);
        setCardItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cardItems.some((obj) => Number(obj.parentId) === Number(id));
    };
    return (
        <AppContext.Provider
            value={{
                items,
                cardItems,
                favorites,
                isItemAdded,
                setCardOpened,
                setCardItems,
                onAddToCard,
            }}>
            <div className="container">
                {cardOpened ? (
                    <Basket
                        items={cardItems}
                        closeBasket={() => setCardOpened(false)}
                        onDelete={deleteSneakers}
                    />
                ) : null}

                {/* смысл такой: если переменная cardOpened true мы рендерим Basket(корзина)если нет, то ничего не редерим(null). Так же в корзине имеется функция setCardOpened, которая при ее запуске меняет state переменной cardOpened(false) и соответвственно корзина закрывается */}
                <div className="block">
                    <Header onClickCard={() => setCardOpened(true)} />
                    <Route path="/" exact>
                        <Home
                            items={items}
                            cardItems={cardItems}
                            searchValue={searchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            setSearchValue={setSearchValue}
                            onAddToFavorites={onAddToFavorites}
                            onAddToCard={onAddToCard}
                            isLoading={isLoading}
                        />
                    </Route>

                    <Route path="favorites" exact>
                        <Favorites onAddToFavorites={onAddToFavorites} />
                    </Route>
                    <Route path="orders" exact>
                        <Orders />
                    </Route>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
