import { useAuth } from 'context/auth.context';
import { req } from 'lib/request';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useLogout from './useLogout';

const useRequest = ({ url }) => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)


    const sendRequest = async (option, options) => {
        setLoading(true);

        const { statusCode, response } = await req(url,
            {
                method: option,
                body: options
            },
            {
                Accept: 'application/json',
                'Authorization': `Bearer ${auth.token}`,
            }
        );

        if (statusCode == 401) {
            toast.error("Session expired: Logout and sign in.")
        }


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
