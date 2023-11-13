import React from 'react';

import {ErrorProvider} from "../../shared/providers/ErrorProvider";
import {useFetchData} from './hooks/useFetchData';
import {useLoading} from "../../shared/providers/LoadingProvider";


export function CollectionPage() {
    const {data} = useFetchData();
    const {isLoading} = useLoading();
    console.log('data: ', data)

    return (!isLoading ? (
        <ErrorProvider>
            {data && (
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                </div>
            )}
        </ErrorProvider>
    ) : null);
}
