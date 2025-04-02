import React, { useContext } from 'react';
import searchIcon from "../../assets/images/search-icon.svg";
import { SearchContext } from '../cashier/search-context.tsx';

const SearchContainer: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={query}
                onChange={handleSearch}
            />
            <img src={searchIcon} alt="Search" className="search-icon" />
        </div>
    );
};

export default SearchContainer;
