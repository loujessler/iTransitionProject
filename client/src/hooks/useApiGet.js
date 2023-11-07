import {useContext, useState} from 'react';
import http from '../http-common';
import { useLoading } from "../shared/providers/LoadingProvider";
import {ErrorContext} from "../shared/contexts/ErrorContext";


export function useApiGet() {
    const [data, setData] = useState(null);
    const { isLoading, setLoading } = useLoading();
    const { showError, resetError } = useContext(ErrorContext);

    const fetchData = async (url) => {
        setLoading(true);
        try {
            const response = await http.get(url);
            setData(response.data);
            resetError();
        } catch (err) {
            showError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, fetchData, isLoading };
}
