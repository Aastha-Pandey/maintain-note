import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [userName, setUserName] = useState();
  const [userEmailId, setUserEmailId] = useState();

  const responseGoogle = async (response) => {
    console.log(response);
    const res = await axios({
      method: 'POST',
      url: `/user/${response.tokenId}`,
    });

    setProfilePicture(response.profileObj.imageUrl);
    setUserEmailId(response.profileObj.email);
    setUserName(response.profileObj.name);
    setUserId(res.data);
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Redirect
            to={{
              pathname: `/note`,
              state: {
                userid: userId,
                status: 'note',
                image: profilePicture,
                name: userName,
                email: userEmailId,
              },
            }}
          ></Redirect>
        </>
      ) : (
        <>
          <div className='flex justify-center items-center h-screen'>
            <GoogleLogin
              clientId='1090448541256-p94hg4259rj6fmcvolkc90fte0he5sgd.apps.googleusercontent.com'
              buttonText='Login with google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
