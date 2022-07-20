import React, { createContext, useReducer } from 'react';

interface IContextProps {
	auth: State;
	authDispatch: React.Dispatch<Actions>;
}

interface State {
	address: string;
	name: string;
	email: string;
	user_id: string;
	token: string;
	dispatch?: React.Dispatch<Actions>;
}

interface Actions {
	type: string;
	payload?: Record<string, string | State> | string[] | string;
}

const InitialState = {
	address: '',
	user_id: '',
	name: '',
	email: '',
	token: '',
};

const AuthContext = createContext({} as IContextProps);
AuthContext.displayName = 'AuthContext';

const { Provider } = AuthContext;

const AuthActionTypes = {
	SET_USER: 'SET_USER',
	SET_TOKEN: 'SET_TOKEN',
	LOGOUT: 'LOGOUT',
};

const spreadNewState = (state: State, payload: any) => ({ ...state, ...payload });

const reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case AuthActionTypes.SET_USER:
			return spreadNewState(state, action.payload);
		case AuthActionTypes.SET_TOKEN:
			return spreadNewState(state, action.payload);
		case AuthActionTypes.LOGOUT:
			return {
				...state,
				...InitialState,
			};
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

const AuthProvider: React.FC<{
	children: React.ReactNode;
}> = (props) => {
	const [state, dispatch] = useReducer(reducer, InitialState);

	return <Provider value={{ auth: state, authDispatch: dispatch }} {...props} />;
};

const useAuth = () => {
	const context = React.useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}

	return context;
};

export { AuthContext, AuthProvider, useAuth, AuthActionTypes };
