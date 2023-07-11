import React from 'react'
import { Route, Routes as SwitchRoutes } from 'react-router-dom';
import { Hooks } from '../../hooks';
import { Providers } from '../../providers';
import { Path } from '../../service/path';

import { LayoutPages } from '../lazy';

const LayoutRoutes = () => {
  const { token } = Providers.useAuth();
  const { actions } = Hooks.useRedirect();

  React.useEffect(() => {
    if(!token) {
      actions.goToAuth();
    }
  }, [token]);

  return (
    <React.Fragment>
      <React.Suspense>
        <SwitchRoutes>
          <Route 
            path={Path.LayoutPath.chat} 
            element={<LayoutPages.Chatpage />}
          />
        </SwitchRoutes>
      </React.Suspense>
    </React.Fragment>
  )
}

export default LayoutRoutes;