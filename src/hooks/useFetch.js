import axios from "axios";
import { useEffect, useState } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setTimeout(() => {
            axios.get(url, {cancelToken: source.token})
                .then(response => {
                    if (response.statusText !== "OK" ){
                        throw Error("Could not fetched this resource");
                    }
                    return response.data;
                }).then(data => {
                    setData(data);
                    setPending(false);
                }).catch(err => {
                    if (axios.isCancel(err)) {

                    }else{
                        setPending(false);
                        setError(err.message);    
                    }
                })
        }, 1000)

        return () => source.cancel();
    }, [url])
    return {data, isPending, error};
}

export default useFetch;