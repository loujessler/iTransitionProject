import * as React from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';
import {Done, Cancel} from "@mui/icons-material";


export default function UserEditProfileBtn(props) {
    const {setEdit} = props
    const buttons = [
        <Button type="submit" key={"done-edit"}>
            <Done sx={{p: .5}}/>
        </Button>,
        <Button key={"cancel-edit"} color="error" onClick={() => setEdit(false)}>
            <Cancel sx={{p: .5}}/>
        </Button>,
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup size="small" aria-label="small button group">
                {buttons.map((button) => (
                        {button}
                ))}
            </ButtonGroup>
        </Box>
    );
}
