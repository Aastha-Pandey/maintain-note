import React from 'react';
import { mutate } from 'swr';
import BottomNoteCardMenu from './BottomNoteCardMenu';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const NoteCard = ({ note, status, setNoteClicked, setNoteid, noteid, uniqueLabel }) => {
  const [bottomMenuVisible, setBottomMenuVisible] = React.useState();

  return (
    <div>
      <div
        className='flex flex-col  space-y-20   cursor-default relative bg-white  py-4  dark:bg-gray-900'
        onClick={() => {
          mutate(`${noteid}`);

          setNoteClicked(true);

          setNoteid(note._id);
        }}
      >
        <div className='flex flex-col  space-y-3   cursor-default dark:bg-gray-900'>
          <div className='font-semibold text-gray-700 mx-8 dark:text-gray-200'>{note.title}</div>

          <div className='text-gray-800 truncate mx-8 dark:text-gray-200'>{note.note}</div>
          <div className='pt-10'>
            <div className='ml-6 rounded-full w-20 bg-opacity-40  bg-gray-300 text-center text-xs font-medium text-gray-700 dark:text-gray-200'>
              {note.label}
            </div>
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
    </div>
  );
};

export default NoteCard;
