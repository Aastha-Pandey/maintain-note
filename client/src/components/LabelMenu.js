import React, { useState } from 'react';
import { mutate } from 'swr';

const LabelMenu = ({
  menuItems,
  updateNoteLabel,
  note,
  setElipsesClicked,

  setAddOrChangeLabelClicked,
  setTextAreaLabel,
  setBottomMenuVisible,
  status,
}) => {
  const [suggestions, setSuggestions] = useState();
  const [showCreateLabel, setShowCreateLabel] = useState();

  return (
    <>
      <div className='flex flex-col  border  shadow-lg bg-white  dark:bg-gray-900 w-44 rounded-md  z-50'>
        <label className='px-4 text-gray-600 dark:text-gray-200'>Label note</label>
        <input
          type='text'
          placeholder='Enter label name'
          className='mx-4 text-sm focus:outline-none dark:bg-gray-900 dark:placeholder-gray-200'
          onChange={(event) => {
            setSuggestions(event.target.value);
            if (event.target.value === '') {
              setShowCreateLabel(false);
            }

            if (menuItems.every((item) => !item.includes(event.target.value))) {
              setShowCreateLabel(true);
            }
          }}
        ></input>

        <div className='my-2 '>
          {!showCreateLabel &&
            menuItems &&
            menuItems.map(
              (item) =>
                item !== null && (
                  <div className='space-x-2 cursor-pointer flex py-2 px-4 text-sm visible text-gray-600 dark:text-gray-200 dark:hover:bg-gray-700  hover:bg-gray-200 w-full'>
                    <input
                      type='checkbox'
                      className='self-center'
                      value={item}
                      onClick={(event) => {
                        if (event.target.checked) {
                          if (!note._id) {
                            setTextAreaLabel(event.target.value);
                          }
                          updateNoteLabel(event.target.value);
                          setElipsesClicked(true);
                          setAddOrChangeLabelClicked(false);
                          setBottomMenuVisible(false);
                          mutate('label');
                          mutate(status);
                        }
                      }}
                    />

                    <label
                      className={
                        suggestions &&
                        (item.includes(suggestions) || item === suggestions) &&
                        'text-gray-600 font-semibold text-sm dark:text-gray-200'
                      }
                    >
                      {item}
                    </label>
                  </div>
                )
            )}
          {showCreateLabel && (
            <button
              className='px-4  w-full border border-t-1 
                    border-r-0 border-l-0  border-b-0 text-left 
                    text-sm text-gray-500 dark:text-gray-200 font-medium'
              onClick={() => {
                updateNoteLabel(suggestions);

                setElipsesClicked(false);
                setAddOrChangeLabelClicked(false);
                setBottomMenuVisible(false);
                mutate('label');
              }}
            >
              + Create
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LabelMenu;
