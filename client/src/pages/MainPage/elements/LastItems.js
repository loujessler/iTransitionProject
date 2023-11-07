import React from "react";

import {List, ListItem, ListItemText, Typography, Box, Divider} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainPageStyles from "../../../styles/MainPageStyles";


export function LastItems(props) {
    const latestItems = props.latestItems;

    return (<Grid sx={MainPageStyles.gridItem}>
        <List color="secondary" sx={MainPageStyles.list}>
            <Typography variant="h5">Last items</Typography>
            {latestItems.map((item) => (<Box key={item.id}>
                <Divider variant="inset" component="li"/>
                <ListItem sx={MainPageStyles.listItem}>
                    <ListItemText
                        primary={item.title.toUpperCase()}
                        secondary={<React.Fragment>
                            <Typography sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                            >
                                {item.user.username}
                            </Typography>
                            {` — ${item.collection.name}`}
                        </React.Fragment>}
                    />
                </ListItem>
            </Box>))}
        </List>
    </Grid>);
}