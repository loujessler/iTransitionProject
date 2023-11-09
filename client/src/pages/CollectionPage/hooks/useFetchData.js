import { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import http from '../../../api/http-common';

import {useLoading} from "../../../shared/providers/LoadingProvider";
import { ErrorContext } from "../../../shared/contexts/ErrorContext";


export function useFetchData() {
    const {id} = useParams();
    const [data, setData] = useState([]);

    const { setLoading } = useLoading();
    const { showError, resetError } = useContext(ErrorContext);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const collection = await http.get(`/collection/${id}/`);

                setData(collection.data);
                resetError();
            } catch (error) {
                showError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, setLoading]);

    return { data };
}
