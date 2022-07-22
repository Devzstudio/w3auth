
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useSignMessage, useDisconnect } from 'wagmi';

import { verifyMessage } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { AuthActionTypes, useAuth } from 'context/auth.context';
import Config from 'lib/config';

const useNounceHandler = ({ account }) => {
    const recoveredAddress = React.useRef<string>();

    const [userResponse, setUserReponse] = useState(null);
    const [refreshFailed, setRefreshFailed] = useState(false);
    const [loading, setLoading] = useState(false);

    const { disconnect } = useDisconnect();

    const { data, error, isLoading, signMessage } = useSignMessage({
        async onSuccess(data, variables) {
            // Verify signature when sign message succeeds
            const address = verifyMessage(variables.message, data);
            recoveredAddress.current = address;

            if (data != '') {
                const verifyCall = await fetch('/api/console/auth/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ signature: data, signed_message: variables.message }),
                });

                const user_response = await verifyCall.json();

                if (user_response.error) {
                    toast.error(user_response.error);
                    processDisconnect();
                } else {
                    window.localStorage.setItem('refresh_token', "true");

                    setUserReponse(user_response);

                    if (router.query.redirect_to) {
                        router.push(router.query.redirect_to as string);
                    } else {
                        router.push('/dashboard');
                    }
                }
            } else {
                processDisconnect();
            }
        },
    });

    const router = useRouter();
    const { auth, authDispatch } = useAuth();

    /*
     * Get nounce from backend , verify it with the signature and save to context
     */

    const handleSignature = useCallback(async () => {
        if (!loading && account?.address && auth.token == '' && refreshFailed) {
            setLoading(true);

            const nounceCall = await fetch('/api/console/auth/nounce', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_address: account.address }),
            });

            const nounceData = await nounceCall.json();

            if (nounceData.nounce) {
                const message = `${Config.SignMessageText} ${nounceData.nounce}`;

                await signMessage({ message });
            }
        }
    }, [account, auth, loading, signMessage]);

    const processDisconnect = useCallback(async () => {
        const refreshToken = window.localStorage.getItem('refresh_token');

        await fetch('/api/console/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        authDispatch({
            type: AuthActionTypes.LOGOUT,
        });

        disconnect();
    }, [authDispatch, disconnect]);

    /*
     *	Refresh state
     */

    const handleRefreshToken = useCallback(async () => {

        console.log("refresgin token")
        if (auth.token == '') {
            const refreshToken = window.localStorage.getItem('refresh_token');

            if (refreshToken) {
                const refreshCall = await fetch('/api/console/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
                setRefreshFailed(true)

                const user_response = await refreshCall.json();

                if (user_response.error) {
                    toast.error(user_response.error);
                    processDisconnect();
                } else {
                    window.localStorage.setItem('refresh_token', "true");

                    setUserReponse(user_response);

                    if (router.query.redirect_to) {
                        router.push(router.query.redirect_to as string);
                    } else {
                        router.push('/dashboard');
                    }
                }
            }
        }
    }, [auth]);

    useEffect(() => {
        handleRefreshToken();
    }, [handleRefreshToken]);

    useEffect(() => {
        if (error) {
            toast.error('User rejected request');
            processDisconnect();
        }
    }, [error, processDisconnect]);

    useEffect(() => {
        if (auth.token == '' && account?.address) {
            handleSignature();
        }
    }, []);

    useEffect(() => {
        if (userResponse) {

            authDispatch({
                type: AuthActionTypes.SET_USER,
                payload: userResponse,
            });
        }
    }, [userResponse, authDispatch]);

    return {
    }
};

export default useNounceHandler;
