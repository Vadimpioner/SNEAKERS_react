import React from 'react';
import Card from '../components/Card';

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    onAddToFavorites,
    onAddToCard,
    isLoading,
}) {
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        ); // поиск по всем кроссовкам)

        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
                key={index} // уникальный индификатор
                loading={isLoading}
                onFavorites={(obj) => onAddToFavorites(obj)}
                onPluse={(obj) => onAddToCard(obj)} // в obj лежит все то, что я поместил в onPluse в качестве аргументов(файл Card)
                {...item}
            />
        ));
    };
    return (
        <div className="content">
            <div className="content__search">
                <h1>{searchValue ? `Поиск по запросу:"${searchValue}"` : 'Все кроссовки'}</h1>
                <div>
                    <img className="search-value" src="img/search.svg" alt="search" />
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..."
                        maxLength="20"
                    />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="close-value"
                            src="img/close.svg"
                            alt="close-value"
                        />
                    )}
                </div>
            </div>
            <div className="wrapper">{renderItems()}</div>
        </div>
    );
}

export default Home;
