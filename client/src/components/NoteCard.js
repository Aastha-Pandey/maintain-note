import React from 'react';
import { mutate } from 'swr';
import BottomNoteCardMenu from './BottomNoteCardMenu';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const NoteCard = ({ note, status, setNoteClicked, setNoteid, noteid, uniqueLabel }) => {
  const [bottomMenuVisible, setBottomMenuVisible] = React.useState();

  return (
    <>
      <div
        className='flex flex-col  space-y-20  mt-6  cursor-default relative bg-white dark:bg-gray-900'
        onClick={() => {
          mutate(`${noteid}`);

          setNoteClicked(true);

          setNoteid(note._id);
        }}
      >
        <div className='flex flex-col self-center items-center space-y-3   cursor-default dark:bg-gray-900 '>
          <div className='font-semibold truncate text-gray-700  dark:text-gray-200 '>
            {note.title}
          </div>

          <div className='text-gray-800 truncate  dark:text-gray-200 '>{note.note}</div>

          <div className='rounded-full self-start w-auto px-2 bg-opacity-40  bg-gray-300 text-center text-xs font-medium text-gray-700 dark:text-gray-200'>
            {note.label}
          </div>
        </div>
      </div>

      <BottomNoteCardMenu
        note={note}
        status={status}
        bottomMenuVisible={bottomMenuVisible}
        setBottomMenuVisible={setBottomMenuVisible}
        uniqueLabel={uniqueLabel}
      />
    </>
  );
};

export default NoteCard;
