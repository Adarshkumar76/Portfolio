import React from "react";

const LoginButton = () => {
  const url = 'http://localhost:3000/login';
  const redirectToLogin =()=>{
    window.location.href = url;  
  }

  

  return <button className="btn" style={{ margin: '5px', padding: '5px' }} onClick={() => redirectToLogin()} >Log In</button>;
};

export default LoginButton;