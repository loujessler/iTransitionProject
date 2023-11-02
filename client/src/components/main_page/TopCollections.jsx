import React from "react";
import {useNavigate} from "react-router-dom";

import {Button, List, ListItem, ListItemText, Typography, Box, Divider} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainPageStyles from "../../styles/MainPageStyles";


export function TopCollections(props) {
    const navigate = useNavigate();
    const top_collections = props.top_collections;

    return (<Grid item xs={9} md={5} sx={MainPageStyles.gridItem}>

            <List
                color="secondary" sx={MainPageStyles.list}>
                <Typography variant="h5">Top collections</Typography>
                {top_collections.map((collection) => (<Box>
                        <Divider variant="inset" component="li"/>
                        <ListItem key={collection.id} sx={MainPageStyles.listItem}>
                            <ListItemText
                                primary={collection.name.toUpperCase()}
                                secondary={<React.Fragment>
                                    <Typography sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                    >
                                        {collection.theme}
                                    </Typography>
                                    {` — ${collection.title}`}
                                </React.Fragment>}
                            />
                            <Button size="small"
                                    onClick={() => navigate(`/collection/${collection.id}`)}>View</Button>
                        </ListItem>
                    </Box>))}
            </List>
        </Grid>);
}