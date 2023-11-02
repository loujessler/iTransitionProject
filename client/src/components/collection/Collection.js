import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import http from '../../http-common';
import Loader from "../utils/Loader";

function Collection() {
    const { id } = useParams();
    const [collection, setCollection] = useState(null);

    useEffect(() => {

        http.get(`/collection/${id}/`)
            .then(response => {
                setCollection(response.data);
            })
            .catch(error => {
                console.error("Error fetching collection:", error);
            });
    }, [id]);

    if (!collection) {
        return <Loader />;
    }

    return (
        <div>
            <h1>{collection.name}</h1>
            <p>{collection.description}</p>
            {/* И другие поля коллекции */}
        </div>
    );
}

export default Collection;
