import {styled, alpha} from '@mui/material/styles';
import {InputBase, Toolbar} from '@mui/material';


export const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(1),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2), marginLeft: theme.spacing(3), width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit', '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('xs')]: {
                width: '10ch', '&:focus': {
                    width: '18ch',
                },
            },
            [theme.breakpoints.up('sm')]: {
                width: '18ch', '&:focus': {
                    width: '24ch',
                },
            },
        },


    }
));

export const StyledToolbar = styled(Toolbar)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row-reverse'
    }
}));

export const HeaderStyle = {
    appBar: {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(26,20,75,0.5)',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        maxWidth: '98%',
        left: 0,
        mx: '1%',
        mt: .8,
        borderRadius: 2,
    }
};
