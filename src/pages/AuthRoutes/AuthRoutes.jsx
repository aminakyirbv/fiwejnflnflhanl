

import React from 'react';
import { Route, Routes as SwitchRoutes } from 'react-router-dom';
import { Hooks } from '../../hooks';

import { Providers } from '../../providers';
import { AuthPages } from '../lazy';

const AuthRoutes = () => {
  const { token } = Providers.useAuth();
  const { actions } = Hooks.useRedirect();

  React.useEffect(() => {
    if(!!token) {
      actions.goToChat();
    }
  }, [token]);

  return (
    <React.Fragment>
      <React.Suspense>
        <SwitchRoutes>
          <Route 
            index
            element={<AuthPages.AuthScreen />}
          />
        </SwitchRoutes>
      </React.Suspense>
    </React.Fragment>
  )
}

export default AuthRoutes;
