import React, { useState } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { mutate } from 'swr';
import LabelMenu from './LabelMenu';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const BottomNoteCardMenu = ({
  oneNote,
  note,
  status,
  bottomMenuVisible,
  setBottomMenuVisible,
  textClicked,
  uniqueLabel,
  setTextAreaLabel,
}) => {
  const [ellipsesClicked, setElipsesClicked] = useState();
  const [addOrChangeLabelClicked, setAddOrChangeLabelClicked] = useState();

  const menuItems = [
    'Delete note',
    (note && note.label) || (oneNote && oneNote[0].label) ? 'Change labels' : 'Add label',
    'Add drawing',
    'Make a copy',
    'Show checkboxes',
    'Copy to Google Docs',
  ];

  const deleteNote = () => {
    axios.delete(`/note/${note._id}`);

    mutate(`${status}`);
  };

  const updateNoteStatus = (tag) => {
    axios.put(`/note/${note._id}`, {
      status: tag,
    });
    mutate(`${status}`);
  };

  const updateNoteLabel = (label) => {
    axios.put(`/note/${note._id}`, {
      label: label,
    });
    mutate(`${status}`);
  };

  return (
    <>
      <div
        className={
          bottomMenuVisible || textClicked
            ? `text-gray-800 dark:text-gray-200 visible   group-hover:visible flex  bg-white dark:bg-gray-900 justify-around pb-4 `
            : `text-gray-800 dark:text-gray-200 invisible   group-hover:visible flex  bg-white justify-around dark:bg-gray-900 pb-4 `
        }
      >
        {status === 'trash' ? (
          <>
            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1 text-sm rounded-sm text-white'>Delete forever</div>
              )}
              placement='bottom'
            >
              <button
                className='h-10 w-10  rounded-full flex hover:bg-gray-300 items-center justify-center focus:outline-none'
                onClick={deleteNote}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  focusable='false'
                  className='h-4 w-4 fill-current text-gray-800 dark:text-gray-200'
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'
                    fill='#626262'
                  />
                </svg>
              </button>
            </Tippy>
            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1 text-sm rounded-sm text-white'>Restore</div>
              )}
              placement='bottom'
            >
              <button
                className=' focus:outline-none h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center '
                onClick={() => {
                  updateNoteStatus('note');
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  focusable='false'
                  className='h-4 w-4 fill-current text-gray-800 dark:text-gray-200'
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M14 14h2l-4-4l-4 4h2v4h4v-4M6 7h12v12c0 .5-.2 1-.61 1.39c-.39.41-.89.61-1.39.61H8c-.5 0-1-.2-1.39-.61C6.2 20 6 19.5 6 19V7m13-3v2H5V4h3.5l1-1h5l1 1H19z'
                    fill='#626262'
                  />
                </svg>
              </button>
            </Tippy>
          </>
        ) : (
          <>
            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1 text-sm rounded-sm text-white focus:outline-none'>
                  Remind me
                </div>
              )}
              placement='bottom'
            >
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 stroke-current text-gray-400 dark:text-gray-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </div>
            </Tippy>

            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1 text-sm rounded-sm text-white focus:outline-none'>
                  Collaborator
                </div>
              )}
              placement='bottom'
            >
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 stroke-current text-gray-400 dark:text-gray-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                  />
                </svg>
              </div>
            </Tippy>

            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700  px-1 text-sm rounded-sm text-white focus:outline-none'>
                  Change color
                </div>
              )}
              placement='bottom'
            >
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 stroke-current text-gray-400 dark:text-gray-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
                  />
                </svg>
              </div>
            </Tippy>
            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700  px-1 text-sm rounded-sm text-white focus:outline-none'>
                  Add image
                </div>
              )}
              placement='bottom'
            >
              <div className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 stroke-current text-gray-400 dark:text-gray-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
              </div>
            </Tippy>

            <button
              className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center '
              onClick={() => {
                if (status === 'note') {
                  updateNoteStatus('archive');
                } else {
                  updateNoteStatus('note');
                }
              }}
            >
              {status === 'note' ? (
                <Tippy
                  render={(attrs) => (
                    <div className='bg-gray-700 px-1 rounded-sm text-white text-sm focus:outline-none'>
                      Archive
                    </div>
                  )}
                  placement='bottom'
                  offset={[0, 20]}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 fill-current text-gray-800 dark:text-gray-200 focus:outline-none'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z'></path>
                  </svg>
                </Tippy>
              ) : (
                <Tippy
                  render={(attrs) => (
                    <div className='bg-gray-700 px-1 rounded-sm text-white text-sm focus:outline-none'>
                      Unarchive
                    </div>
                  )}
                  placement='bottom'
                  offset={[0, 20]}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 fill-current text-gray-800 dark:text-gray-200 focus:outline-none'
                    aria-hidden='true'
                    focusable='false'
                    preserveAspectRatio='xMidYMid meet'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z' />
                  </svg>
                </Tippy>
              )}
            </button>

            <Tippy
              render={(attrs) => (
                <div className='bg-gray-700 px-1  text-sm rounded-sm text-white focus:outline-none'>
                  Menu
                </div>
              )}
              placement='bottom'
            >
              <Tippy
                render={(attrs) =>
                  addOrChangeLabelClicked ? (
                    <LabelMenu
                      status={status}
                      menuItems={uniqueLabel}
                      updateNoteLabel={updateNoteLabel}
                      ellipsesClicked={ellipsesClicked}
                      setElipsesClicked={setElipsesClicked}
                      addOrChangeLabelClicked={addOrChangeLabelClicked}
                      setAddOrChangeLabelClicked={setAddOrChangeLabelClicked}
                      bottomMenuVisible={bottomMenuVisible}
                      setBottomMenuVisible={setBottomMenuVisible}
                      note={note}
                      setTextAreaLabel={setTextAreaLabel}
                    />
                  ) : (
                    <Menu
                      bottomMenuVisible={bottomMenuVisible}
                      setBottomMenuVisible={setBottomMenuVisible}
                      menuItems={menuItems}
                      updateNoteStatus={updateNoteStatus}
                      setElipsesClicked={setElipsesClicked}
                      ellipsesClicked={ellipsesClicked}
                      addOrChangeLabelClicked={addOrChangeLabelClicked}
                      setAddOrChangeLabelClicked={setAddOrChangeLabelClicked}
                    />
                  )
                }
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
                // theme='light'
                trigger='click'
                interactive='true'
                placement='bottom'
                disabled={ellipsesClicked}
                onHidden={() => {
                  setElipsesClicked(false);
                }}
              >
                <button
                  className='h-10 w-10  rounded-full flex hover:bg-gray-300 dark:hover:bg-gray-700 items-center justify-center '
                  onClick={() => {
                    setBottomMenuVisible(!bottomMenuVisible);
                    setAddOrChangeLabelClicked(false);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-4 w-4 stroke-current text-gray-800 dark:text-gray-200'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                    />
                  </svg>
                </button>
              </Tippy>
            </Tippy>
          </>
        )}
      </div>
    </>
  );
};

export default BottomNoteCardMenu;
