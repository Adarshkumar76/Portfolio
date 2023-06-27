import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn" style={{ margin: '5px', padding: '5px' }} onClick={() => loginWithRedirect()} >Log In</button>;
};

export default LoginButton;