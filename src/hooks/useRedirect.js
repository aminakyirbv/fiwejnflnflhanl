
import React from 'react';
import { useNavigate } from "react-router-dom";

import { Path } from '../service/path';

const useRedirect = () => {
  const navigate = useNavigate();

  const goToChat = React.useCallback(() => navigate(Path.LayoutPath.chat), [navigate]);
  const goToAuth = React.useCallback(() => navigate(Path.AuthPath.auth), [navigate]);

  return {
    actions: {
      goToChat,
      goToAuth
    }
  }
}

export default useRedirect;
