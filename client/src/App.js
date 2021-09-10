import React from 'react';
import Routes from './../src/routes/Routes';

export const TextAreaContext = React.createContext();

function App() {
  const [textAreaClicked, setTextAreaClicked] = React.useState();
  const [theme, setTheme] = React.useState();
  const [list, setList] = React.useState();
  const [sideNavigationBarVisible, setSideNavigationBarVisible] = React.useState(true);

  return (
    <div className={`App ${theme} dark:bg-gray-900`}>
      <TextAreaContext.Provider
        value={{
          textAreaClicked,
          setTextAreaClicked,
          theme,
          setTheme,
          list,
          setList,
          sideNavigationBarVisible,
          setSideNavigationBarVisible,
        }}
      >
        <Routes />
      </TextAreaContext.Provider>
    </div>
  );
}

export default App;
