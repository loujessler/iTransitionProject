import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../HeaderStyles';

const SearchCustom = () => (
    <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            id="search-header"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
    </Search>
);

export default SearchCustom;
