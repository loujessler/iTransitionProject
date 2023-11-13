import * as React from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';
import {Delete as DeleteIcon, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


export default function UserCollectionBtn(props) {
    const navigate = useNavigate();
    const collection = props.collection;
    const buttons = [
        <Button key={`view-col-${collection.id}`} onClick={() => navigate(`/collection/${collection.id}`)}>
            View
        </Button>,
        <Button key={`edit-col-${collection.id}`}>
            <Edit sx={{p: .5}}/>
        </Button>,
        <Button key={`del-col-${collection.id}`} color="error">
            <DeleteIcon sx={{p: .5}}/>
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
