const MainPageStyles = {
    container: {
        backgroundColor: "background.default",
        borderRadius: 'theme.shape.borderRadius',
        margin: '1rem',
        width: 'calc(100% - 2rem)',
        color: 'text.primary'
    },
    gridItem: {
        color: "inherit",
        margin: '1rem 0',
    },
    chip: {
        margin: '5px',
        '&:hover': {
            backgroundColor: 'rgba(32,118,210,0.2)',
        }
    },
    list: {
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 'theme.shape.borderRadius',
        boxShadow: '0 0 10px 0 rgba(32,118,210,0.2)',
    },
    listItem: {
        alignItems: "center",
        '&:hover': {
            backgroundColor: 'rgba(32,118,210,0.08)',
        }
    },
};

export default MainPageStyles;
