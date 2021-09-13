import React, { useState } from 'react';
import { mutate } from 'swr';
import { useLocation, Redirect } from 'react-router-dom';
import { TextAreaContext } from '../../App';
import Menu from './../Menu';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import Logout from '../Logout';
import { UserContext } from '../Notes';

const TopNavigationBar = () => {
  const { user } = React.useContext(UserContext);
  const {
    setTextAreaClicked,
    theme,
    status,
    list,
    setList,
    sideNavigationBarVisible,
    setSideNavigationBarVisible,
  } = React.useContext(TextAreaContext);

  const [isLoggedOut, setIsLoggedOut] = useState();

  const menuItems = [
    'Settings',
    theme === 'dark' ? 'Disable dark theme' : 'Enable dark theme',
    'Send feedback',
    'Help',
    'App downloads',
    'Keyboard shortcuts',
  ];
  const [showSettingsMenu, setShowSettingsMenu] = React.useState(false);

  return (
    <>
      <nav
        className='bg-white border border-b border-gray-300 w-full h-16 flex justify-around fixed  inset-x-0 top-0 z-40 dark:bg-gray-900 '
        onClick={() => {
          setTextAreaClicked(false);
        }}
      >
        <div className='flex space-x-2'>
          <button
            onClick={() => {
              setSideNavigationBarVisible(!sideNavigationBarVisible);
            }}
          >
            <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
              <Tippy
                render={(attrs) => (
                  <div className='bg-gray-700 px-1 rounded-sm text-white text-sm'>Main menu</div>
                )}
                placement='bottom'
              >
                <svg
                  focusable='false'
                  viewBox='0 0 24 24'
                  className='self-center w-6 h-6 fill-current text-gray-600 dark:text-gray-200 focus:outline-none'
                >
                  <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path>
                </svg>
              </Tippy>
            </div>
          </button>
          <div className='mt-2'>
            <img src='favicon.ico' alt=''></img>
          </div>

          <div className='self-center dark:text-gray-200 text-gray-600 text-lg font-semibold'>
            Maintain
          </div>
        </div>
        <div className='flex  justify-around w-screen md:w-2/4 lg:w-2/4 px-8 dark:bg-gray-900 '>
          <div className=' flex my-2 rounded-md bg-gray-100 w-full dark:bg-gray-700 px-2 space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 self-center stroke-current text-gray-600 dark:text-gray-200 focus:outline-none'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>

            <input
              disabled
              placeholder='Search'
              className={` focus:outline-none  bg-gray-100 w-full dark:bg-gray-700 placeholder-gray-600 dark:text-gray-200 dark:placeholder-gray-200`}
            />
          </div>
        </div>
        <div className='flex space-x-6'>
          <button
            onClick={() => {
              mutate(status);
              mutate('label');
            }}
          >
            <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
              <Tippy
                render={(attrs) => (
                  <div className='bg-gray-700 px-1 rounded-sm text-white text-sm'>Refresh</div>
                )}
                placement='bottom'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 self-center stroke-current text-gray-600 dark:text-gray-200 focus:outline-none'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  />
                </svg>
              </Tippy>
            </div>
          </button>

          <button
            onClick={() => {
              setList(!list);
            }}
          >
            {list ? (
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                <Tippy
                  render={(attrs) => (
                    <div className='bg-gray-700 px-1 rounded-sm text-white text-sm'>Grid view</div>
                  )}
                  placement='bottom'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 self-center stroke-current text-gray-600 dark:text-gray-200 focus:outline-none'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                    />
                  </svg>
                </Tippy>
              </div>
            ) : (
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                <Tippy
                  render={(attrs) => (
                    <div className='bg-gray-700 px-1 rounded-sm text-white text-sm'>List view</div>
                  )}
                  placement='bottom'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 self-center stroke-current text-gray-600 dark:text-gray-200 focus:outline-none'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 10h16M4 14h16M4 18h16'
                    />
                  </svg>
                </Tippy>
              </div>
            )}
          </button>

          <button>
            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1 rounded-sm text-white text-sm'>Settings</div>
              )}
              offset={[0, 3]}
              placement='bottom'
            >
              <Tippy
                render={(attrs) => {
                  return (
                    <Menu
                      {...attrs}
                      menuItems={menuItems}
                      showSettingsMenu={showSettingsMenu}
                      setShowSettingsMenu={setShowSettingsMenu}
                    />
                  );
                }}
                offset={[0, 20]}
                trigger='click'
                interactive='true'
                placement='bottom'
                disabled={showSettingsMenu}
                onHidden={() => {
                  setShowSettingsMenu(false);
                }}
                popperOptions={{
                  modifiers: [
                    {
                      // padding: 0,

                      name: 'flip',
                      options: {
                        fallbackPlacements: ['top', 'right'],
                      },
                    },
                    {
                      name: 'preventOverflow',
                      options: {
                        altAxis: true,
                        tether: false,
                      },
                    },
                  ],
                }}
              >
                <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6 self-center stroke-current text-gray-600 dark:text-gray-200 focus:outline-none'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
              </Tippy>
            </Tippy>
          </button>
        </div>
        {isLoggedOut ? (
          <Redirect
            to={{
              pathname: `/`,
            }}
          ></Redirect>
        ) : (
          <Tippy
            render={(attrs) => {
              return (
                <>
                  <div className='flex flex-col bg-gray-800 text-gray-50 w-40 rounded-md text-sm text-left px-2'>
                    <div>Google Account</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                </>
              );
            }}
            placement='bottom'
          >
            <Tippy
              render={(attrs) => {
                return (
                  <>
                    <Logout setIsLoggedOut={setIsLoggedOut} />
                  </>
                );
              }}
              interactive='true'
              trigger='click'
            >
              <button className=' flex items-center justify-center... '>
                <img
                  alt='profile'
                  className=' hover:shadow-lg rounded-full h-10 w-10 flex items-center justify-center...'
                  src={user.image}
                />
              </button>
            </Tippy>
          </Tippy>
        )}
      </nav>
    </>
  );
};

export default TopNavigationBar;
