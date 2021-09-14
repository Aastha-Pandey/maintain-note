import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { mutate } from 'swr';
import BottomNoteCardMenu from './BottomNoteCardMenu';

const TextArea = ({
  tClicked,
  oneNote,
  position,
  title,
  setTitle,
  note,
  setNote,
  status,
  uniqueLabel,
  textArealabel,
  setTextAreaLabel,
  noteClicked,
}) => {
  let location = useLocation();

  const [textClicked, setTextClicked] = useState(tClicked);
  const [bottomMenuVisible, setBottomMenuVisible] = React.useState();

  var dateString = oneNote && oneNote[0].updatedAt;
  dateString = new Date(dateString).toUTCString();
  dateString = dateString.split(' ').slice(1, 4).join(' ');

  useEffect(() => {
    setTitle(oneNote && oneNote[0].title);
    setNote(oneNote && oneNote[0].note);
  }, [oneNote, setTitle, setNote]);

  return (
    <>
      {textClicked ? (
        <>
          <div
            className={`${position} flex flex-col my-9  shadow-lg w-7/12 self-center rounded-md py-4 bg-white`}
          >
            <textarea
              value={title}
              placeholder='Title'
              rows='4'
              cols='50'
              className='focus:outline-none   h-10 px-6 dark:text-gray-200 dark:bg-gray-700  dark:placeholder-gray-200 placeholder-gray-500 font-bold'
              onChange={(event) => {
                setTitle(event.target.value);
                mutate(status);
              }}
            />

            <textarea
              value={note}
              autoFocus
              rows='4'
              cols='50'
              className='focus:outline-none    h-10 px-6 dark:placeholder-gray-200  placeholder-gray-500 font-semibold dark:text-gray-200 dark:bg-gray-700'
              placeholder='Take a note...'
              onChange={(event) => {
                setNote(event.target.value);
                mutate(status);
              }}
            />

            {noteClicked && oneNote ? (
              <div className='ml-6 rounded-full w-20 bg-opacity-40  bg-gray-300 text-center text-xs font-medium text-gray-700 dark:text-gray-200'>
                {oneNote[0].label}
              </div>
            ) : (
              <div className='ml-6 rounded-full w-20 bg-opacity-40  bg-gray-300 text-center text-xs font-medium text-gray-700 dark:text-gray-200'>
                {textArealabel}
              </div>
            )}
            {!noteClicked && (
              <div className='flex justify-around'>
                <button
                  className='bg-blue-500 focus:outline-none text-blue-50 border font-semibold rounded-md px-2 text-sm hover:shadow-md'
                  onClick={() => {
                    axios.post('/note', {
                      userid: location.state.userid,
                      title: title,
                      note: note,
                      label: textArealabel,
                    });

                    mutate(status);
                    setTitle();
                    setNote();
                    setTextAreaLabel();
                    setTextClicked(false);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setTitle();
                    setNote();
                    setTextAreaLabel();
                    setTextClicked(false);
                  }}
                  className=' focus:outline-none text-gray-800 font-semibold dark:text-blue-50 px-2  rounded-md text-sm border hover:shadow-md'
                >
                  Close
                </button>
              </div>
            )}

            {noteClicked && <div className='flex justify-center'>{dateString}</div>}
            <BottomNoteCardMenu
              note={note}
              textClicked={textClicked}
              bottomMenuVisible={bottomMenuVisible}
              setBottomMenuVisible={setBottomMenuVisible}
              uniqueLabel={uniqueLabel}
              setTextAreaLabel={setTextAreaLabel}
            />
          </div>
        </>
      ) : (
        <input
          className='focus:outline-none my-2 rounded-md bg-white shadow-lg  h-10 p-6 self-center w-6/12 placeholder-gray-500  dark:placeholder-gray-200  dark:text-gray-200 dark:bg-gray-700'
          placeholder='Take a note...'
          autoFocus
          onClick={() => {
            setTextClicked(true);
          }}
        />
      )}
    </>
  );
};

export default TextArea;
