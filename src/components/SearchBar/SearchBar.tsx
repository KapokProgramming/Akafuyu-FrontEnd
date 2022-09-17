import { Wrapper } from "./SearchBar.style";

type Props = {

};

const SearchBar = () => {
    return (
        <Wrapper>
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                    <button type="submit" className="searchButton">
                        Go
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}

export default SearchBar;