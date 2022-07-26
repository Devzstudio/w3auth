import { useRouter } from 'next/router';
import { useAuth } from 'context/auth.context';

import { useEffect } from 'react';

const useIsAuthenticated = () => {
    const { auth } = useAuth()
    const router = useRouter();

    // useEffect(() => {
    //     if (!auth.token && router.asPath !== "/") {
    //         router.push('/')
    //     }
    // }, [auth])

    return {}

}


export default useIsAuthenticated;
