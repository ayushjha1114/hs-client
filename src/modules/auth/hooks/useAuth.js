import { useState, useEffect, useMemo } from 'react';
import Auth from '@aws-amplify/auth';
import { browserHistory } from 'react-router';
export default ({ provider, options }) => {
  const [state, setState] = useState({
    user: {},
    isSignedIn: false,
  });

  const auth = useMemo(() => {
    Auth.configure(options);
    return Auth;
  }, []);

  useEffect(() => {
    auth
      .currentAuthenticatedUser()
      .then((user) => {

        window.localStorage.setItem(
          'xx_SSOUserDetail',
          JSON.stringify(user),
        );
        window.localStorage.setItem(
          'xxx_SSO_token',
          JSON.stringify(user.signInUserSession.accessToken.jwtToken),
        );
        setState({ user, isSignedIn: true });
        if (!(window.localStorage.getItem("xxxSSO_at"))) {
          window.localStorage.setItem(
            'xxx_SSO_at',
            Date.now(),
          );
        }
        if (
          user &&
          user.signInUserSession &&
          user.signInUserSession.accessToken &&
          user.signInUserSession.accessToken.jwtToken &&
          Object.keys(JSON.parse(user.signInUserSession.accessToken.jwtToken)).length <= 0
        ) {
          browserHistory.push("/no-access");
        }
      })
      .catch(() => { });
  }, []);

  const signIn = () => auth.federatedSignIn({ provider });

  const signOut = () => auth.signOut();

  return {
    ...state,
    signIn,
    signOut,
  };
};