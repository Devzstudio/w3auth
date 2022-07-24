import { AuthActionTypes, useAuth } from 'context/auth.context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDisconnect } from 'wagmi';
import useRequest from './useRequests';

const useLogout = () => {
	const { loading, post, response } = useRequest({ url: '/api/console/auth/logout' });
	const router = useRouter();
	const { auth, authDispatch } = useAuth();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		if (response) {
			authDispatch({
				type: AuthActionTypes.LOGOUT,
			});

			window.localStorage.removeItem('refresh_token');
			disconnect();
			router.push('/');
		}
	}, [response]);

	const handleLogout = async () => {
		await post({});
	};

	return { handleLogout };
};

export default useLogout;
