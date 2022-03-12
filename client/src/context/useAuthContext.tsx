import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { ProfileApiDataSuccess } from '../interface/ProfileApiData';
import { Profile } from '../interface/Profile';

interface IAuthContext {
  loggedInUserProfile: Profile | null | undefined;
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateProfileContext: (data: ProfileApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUserProfile: undefined,
  loggedInUser: undefined,
  updateLoginContext: () => null,
  updateProfileContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [loggedInUserProfile, setLoggedInUserProfile] = useState<Profile | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      setLoggedInUserProfile(data.profile);
      if (data.user && (history.location.pathname === '/login' || history.location.pathname === '/signup')) {
        history.push('/');
      }
    },
    [history],
  );

  const updateProfileContext = useCallback((data: ProfileApiDataSuccess) => {
    setLoggedInUserProfile(data.profile);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setLoggedInUserProfile(undefined);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          const pathName = history.location.pathname;
          if (
            !(
              pathName === '/signup' ||
              pathName === '/send-password-reset' ||
              pathName.match(/\/password-reset\/.+\/.+/)
            )
          ) {
            history.push('/login');
          }
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider
      value={{ loggedInUser, loggedInUserProfile, updateLoginContext, updateProfileContext, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
