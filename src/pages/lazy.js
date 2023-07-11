import React from "react";


const Chatpage = React.lazy(() => import("../apps/layout/chat/Chatpage"));

const AuthScreen = React.lazy(() => import("../apps/auth/Auth")); 

export const LayoutPages = {
  Chatpage
};

export const AuthPages = {
  AuthScreen
}