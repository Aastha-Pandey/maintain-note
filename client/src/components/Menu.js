import React from 'react';
import { TextAreaContext } from '../App';

const Menu = ({
  bottomMenuVisible,
  setBottomMenuVisible,
  menuItems,
  updateNoteStatus,
  ellipsesClicked,
  setElipsesClicked,
  addOrChangeLabelClicked,
  setAddOrChangeLabelClicked,
  showSettingsMenu,
  setShowSettingsMenu,
  setNoteClicked,
  setTitle,
  setNote,
  note,
  noteClicked,
}) => {
  const { setTheme } = React.useContext(TextAreaContext);

  return (
    <>
      <div className={`flex flex-col  border   bg-white  w-44 rounded-md dark:bg-gray-900   z-20`}>
        <div className='my-2 '>
          {menuItems.map(
            (item) =>
              item !== null && (
                <button
                  onClick={() => {
                    if (note && item === 'Delete note') {
                      updateNoteStatus('trash');
                      if (noteClicked) {
                        setNoteClicked(false);
                        setTitle();
                        setNote();
                      }

                      setBottomMenuVisible(!bottomMenuVisible);
                      setElipsesClicked(!ellipsesClicked);
                    }
                    if (item === 'Change labels' || item === 'Add label') {
                      setAddOrChangeLabelClicked(!addOrChangeLabelClicked);
                    }
                    if (item === 'Enable dark theme') {
                      setTheme('dark');
                      setShowSettingsMenu(!showSettingsMenu);
                    }
                    if (item === 'Disable dark theme') {
                      setTheme();
                      setShowSettingsMenu(!showSettingsMenu);
                    }
                  }}
                  className={
                    item === 'Delete note' ||
                    item === 'Change labels' ||
                    item === 'Add label' ||
                    item === 'Enable dark theme' ||
                    item === 'Disable dark theme'
                      ? 'py-2 px-4 text-sm visible text-left text-gray-600 dark:text-gray-200  hover:bg-gray-200 w-full dark:hover:bg-gray-600'
                      : 'py-2 px-4 text-sm visible text-left text-gray-400 dark:text-gray-700  hover:bg-gray-200 w-full dark:hover:bg-gray-600'
                  }
                >
                  {item}
                </button>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
