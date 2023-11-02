import React from "react";

import {List, ListItem, ListItemText, Typography, Box, Divider} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainPageStyles from "../../styles/MainPageStyles";


export function LastItems(props) {
    const items = props.items;

    return (
        <Grid item xs={9} md={5} sx={MainPageStyles.gridItem}>
            <List color="secondary" sx={MainPageStyles.list}>
                <Typography variant="h5">Last items</Typography>
                {/*<Card key={item.id} variant="outlined" style={{marginBottom: 15}}>*/}
                {items.map((item) => (
                    <Box>
                        <Divider variant="inset" component="li"/>
                        <ListItem key={item.id} sx={MainPageStyles.listItem}>
                            <ListItemText
                                primary={item.title.toUpperCase()}
                                secondary={
                                    <React.Fragment>
                                        <Typography sx={{display: 'inline'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                            // variant="h6"
                                        >
                                            {item.user.username}
                                        </Typography>
                                        {` — ${item.collection.name}`}
                                    </React.Fragment>
                                }
                            />
                            {/*<Typography color="textSecondary"></Typography>*/}
                            {/*<Typography color="textSecondary">{item.user.username}</Typography>*/}
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Grid>
    );
}