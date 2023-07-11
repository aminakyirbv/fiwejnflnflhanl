import React from 'react';
import { Route, Routes as SwitchRoutes } from "react-router-dom";

import { Path } from '../service/path';
import * as Routers from "../pages/export";

const Routes = () => {
  return (
    <React.Fragment>
      <SwitchRoutes>
        <Route path={Path.MainPath.layout} element={<Routers.LayoutRoutes />} />
        <Route path={Path.MainPath.auth} element={<Routers.AuthRoutes />} />
      </SwitchRoutes>
    </React.Fragment>
  )
}

export default Routes;
