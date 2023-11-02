import {createTheme} from '@mui/material/styles';

function themeCreator(mode) {
    // const themeLight = createTheme({
    //     palette: {
    //         background: {
    //             default: "#e2eaf0",
    //             paper: "#ccddec"
    //         }
    //     },
    // });
    //
    // const themeDark = createTheme({
    //     palette: {
    //         background: {
    //             default: "#010101",
    //             paper: "#111111"
    //         },
    //         text: {
    //             primary: "#ffffff",
    //             secondary: "rgba(255, 255, 255, 0.7)",
    //             disabled: "rgba(255, 255, 255, 0.5)"
    //         }
    //     }
    // });

    return createTheme({
        palette: {
            mode: mode ? 'light' : 'dark'
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        }
    });
}


export default themeCreator;
