import React from "react";

import {Chip, Typography, List} from "@mui/material";
import {Tag} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import MainPageStyles from "../../styles/MainPageStyles";


export function Tags(props) {
    const tags = props.tags;

    return (
        <Grid xs='auto' md={2} sx={MainPageStyles.gridItem}>
            <List color="secondary" sx={MainPageStyles.list}>
                <Typography variant="h5">Tags cloud</Typography>
                {tags.map((tag) => (
                    <Chip
                        key={tag.id}
                        icon={<Tag/>}
                        label={tag.name}
                        onClick={() => {
                            // Здесь вы можете реализовать навигацию к странице с результатами поиска
                        }}
                        sx={MainPageStyles.chip}
                    />
                ))}
            </List>
        </Grid>
    );
}