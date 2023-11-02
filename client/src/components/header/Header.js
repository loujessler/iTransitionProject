import React from 'react';
import {AppBar, Toolbar, Typography, Button, InputBase} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MainPageStyles from "../../styles/MainPageStyles";
import Sidebar from "../sidebar/Sidebar";
import {useThemeState} from "../../theme";
import ModeTheme from "../utils/ModeTheme";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2), marginLeft: theme.spacing(3), width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit', '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch', '&:focus': {
                width: '32ch',
            },
        },
    },
}));

const Header = () => {
    const {isMobile} = useThemeState();

    return (<AppBar position="static" sx={MainPageStyles.appBar}>
        <Toolbar sx={{justifyContent: 'space-evenly'}}>
            {isMobile ? (<Sidebar/>) : (<ModeTheme componentType={'iconButton'}/>)}
            <Typography variant="h6" style={{flexGrow: 1}}>
                SACI
            </Typography>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
            {!isMobile && (<>
                <Button color="inherit">Login</Button>
                <Button color="inherit">Register</Button>
            </>)}
        </Toolbar>
    </AppBar>);
};

export default Header;
