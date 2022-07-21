import { req } from 'lib/request';
import { useState } from 'react';

const useRequest = ({ url }) => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const sendRequest = async (option, options) => {
        setLoading(true);

        const response = await req(url,
            {
                method: option,
                body: options
            }
        );

        setLoading(false);
        setResponse(response)

    }



    const get = async (options) => {
        sendRequest("GET", options)
    }

    const post = async (options) => {
        sendRequest("POST", options)
    }

    return {
        loading, response, post, get
    }

}


export default useRequest;
