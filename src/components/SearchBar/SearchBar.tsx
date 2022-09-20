import { Wrapper } from "./SearchBar.style";
import { TextField } from "@material-ui/core";

type Props = {
    onQueryChange : (e: React.ChangeEvent<any>) => void ;
};

const SearchBar : React.FC<Props> = ({onQueryChange}) => {
    return (
        <Wrapper>
            <div className="wrap">
                <div className="search">
                <TextField onChange={onQueryChange} fullWidth label="search" />
                    {/* <input type="text" onChange={onQueryChange} className="searchTerm" placeholder="What are you looking for?" /> */}
                </div>
            </div>
        </Wrapper>
    )
}

export default SearchBar;