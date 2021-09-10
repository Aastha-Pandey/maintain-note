import React from 'react';

import { GoogleLogout } from 'react-google-login';
import { UserContext } from './Notes';

const Logout = ({ setIsLoggedOut }) => {
  const { user } = React.useContext(UserContext);

  const logout = () => {
    setIsLoggedOut(true);
  };

  return (
    <>
      <div className='flex flex-col  py-8 px-10 space-y-4 shadow-lg border rounded-md bg-white dark:bg-gray-900'>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center justify-center'>
            <img
              alt='profile'
              className=' hover:shadow-lg rounded-full h-20 w-20 flex items-center justify-center...'
              src={user.image}
            />
          </div>

          <div>
            <div className=' font-semibold flex items-center justify-center dark:text-gray-200'>
              {user.name}
            </div>
            <div className='flex items-center justify-center text-gray-600 dark:text-gray-200'>
              {user.email}
            </div>
          </div>
        </div>
        <GoogleLogout
          clientId='1090448541256-p94hg4259rj6fmcvolkc90fte0he5sgd.apps.googleusercontent.com'
          buttonText='Sign out'
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
    </>
  );
};

export default Logout;
