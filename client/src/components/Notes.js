import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import 'tailwindcss/tailwind.css';
import TopNavigationBar from './header/TopNavigationBar';
import NoteCard from './NoteCard';
import SideNavigationBar from './side/SideNavigationBar';
import TextArea from './TextArea';
import { TextAreaContext } from '../App';

export const UserContext = React.createContext();

const Notes = () => {
  let location = useLocation();
  let { status } = useParams();
  const [noteClicked, setNoteClicked] = React.useState();
  const [noteid, setNoteid] = React.useState();
  const [title, setTitle] = useState();
  const [note, setNote] = useState();
  const [user, setUser] = React.useState({
    name: location.state.name,
    email: location.state.email,
    image: location.state.image,
  });

  const [textArealabel, setTextAreaLabel] = useState();

  const { list, sideNavigationBarVisible } = React.useContext(TextAreaContext);

  //notes
  const fetcher = () => {
    return axios.get(`/note/${location.state.userid}/${status}`).then((res) => res.data);
  };

  const { data: notes } = useSWR(`${status}`, fetcher, { refreshInterval: 1000 });

  //update notes
  const notefetcher = () => {
    return axios.get(`/onenote/${location.state.userid}/${noteid}`).then((res) => res.data);
  };

  const { data: oneNote } = useSWR(noteid ? `${noteid}` : null, notefetcher);

  //all labels
  const labelFetcher = () => axios.get(`/label/${location.state.userid}`).then((res) => res.data);

  const { data: label } = useSWR(`label`, labelFetcher);

  let [uniqueLabel, setUniqueLabel] = useState();

  React.useEffect(() => {
    if (label) {
      setUniqueLabel([...new Set(label)]);
    }
  }, [label]);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
        }}
      >
        <div className='relative z-20  '>
          <TopNavigationBar status={status} />
          <div className='flex '>
            {sideNavigationBarVisible && (
              <SideNavigationBar userid={location.state.userid} uniqueLabel={uniqueLabel} />
            )}

            <div className='flex flex-col  z-30 mt-16 h-screen w-4/5 inset-y-0 right-0 absolute bg-white dark:bg-gray-900 '>
              <TextArea
                title={title}
                setTitle={setTitle}
                note={note}
                setNote={setNote}
                status={status}
                uniqueLabel={uniqueLabel}
                textArealabel={textArealabel}
                setTextAreaLabel={setTextAreaLabel}
              />

              {(location.pathname === `/${status}` || location.pathname === `/label/${status}`) && (
                <div className=' '>
                  <div
                    className={
                      list
                        ? 'flex flex-col space-y-4 py-8 px-40 '
                        : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-8 '
                    }
                  >
                    {notes &&
                      notes.map((note, noteIndex) => (
                        <>
                          <div className='border border-gray-200  group rounded-md  hover:shadow-lg  w-auto  '>
                            <NoteCard
                              noteIndex={noteIndex}
                              note={note}
                              status={status}
                              setNoteClicked={setNoteClicked}
                              setNoteid={setNoteid}
                              noteid={noteid}
                              uniqueLabel={uniqueLabel}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {noteClicked && (
          <>
            <div className='absolute z-40 bg-opacity-40 bg-gray-800 inset-0 flex justify-center items-center'>
              <div
                className=' w-full h-full relative'
                onClick={() => {
                  setNoteClicked(false);
                  axios.put(`/note/${noteid}`, {
                    userid: location.state.userid,
                    title: title,
                    note: note,
                    label: textArealabel,
                  });
                  setTitle();
                  setNote();
                  setTextAreaLabel();
                  mutate(`${status}`);
                }}
              ></div>
              <TextArea
                noteClicked={noteClicked}
                status={status}
                tClicked='true'
                oneNote={oneNote}
                position='absolute'
                title={title}
                setTitle={setTitle}
                note={note}
                setNote={setNote}
                textArealabel={textArealabel}
                setTextAreaLabel={setTextAreaLabel}
                uniqueLabel={uniqueLabel}
              />
            </div>
          </>
        )}
      </UserContext.Provider>
    </>
  );
};

export default Notes;
