import { useState, useEffect, useContext } from 'react';
import http from '../../../http-common';
import {useLoading} from "../../../shared/providers/LoadingProvider";
import { ErrorContext } from "../../../shared/contexts/ErrorContext";


export function useFetchData() {
    const [data, setData] = useState({
        latestItems: [],
        topCollections: [],
        tags: []
    });

    const { setLoading } = useLoading();
    const { showError, resetError } = useContext(ErrorContext);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {

            try {
                const [latestItemsResponse, topCollectionsResponse, tagsResponse] = await Promise.all([
                    http.get('latest-items/'),
                    http.get('top-collections/'),
                    http.get('tags/')
                ]);

                setData({
                    latestItems: latestItemsResponse.data,
                    topCollections: topCollectionsResponse.data,
                    tags: tagsResponse.data
                });

                resetError();
            } catch (error) {
                showError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [setLoading]);

    return { data };
}
