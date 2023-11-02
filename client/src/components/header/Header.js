import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    InputBase,
    useMediaQuery,
    useTheme,
    IconButton,
} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MainPageStyles from "../../styles/MainPageStyles";
import Sidebar from "../sidebar/Sidebar";

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
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(3),
        width: 'auto',
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
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '32ch',
            },
        },
    },
}));

const Header = ({setMode, mode}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={MainPageStyles.appBar}>
            <Toolbar sx={{justifyContent: 'space-evenly'}}>
                {isMobile ? (
                    <Sidebar/>
                ) : (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMode(!mode)}>
                        {mode ?
                            <Brightness7Icon/> : <Brightness4Icon/>
                        }
                    </IconButton>
                )}
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
                {!isMobile && (
                    <>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
