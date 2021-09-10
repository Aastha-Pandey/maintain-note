import React from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { mutate } from 'swr';
import { TextAreaContext } from './../../App';

import { archiveSvg, noteSvg, reminderSvg, trashSvg, labelSvg } from '../svgElements';

const SideNavigationBar = ({ userid, uniqueLabel }) => {
  let { status } = useParams();
  const { theme } = React.useContext(TextAreaContext);
  var tabNames = ['note', 'reminders', 'archive', 'trash'];
  const svgElements = [noteSvg, reminderSvg, archiveSvg, trashSvg];

  return (
    <>
      <div className='invisible md:visible lg:visible h-screen w-1/5 flex flex-col  space-y-4 fixed inset-y-0 left-0 overflow-auto mt-16 bg-white dark:bg-gray-900'>
        {tabNames.map((tabName, tabNameIndex) => {
          return (
            <NavLink
              to={{
                pathname: `/${tabName}`,
                state: {
                  userid: userid,
                },
              }}
              onClick={() => {
                mutate(`${status}`);
              }}
              activeStyle={{
                fontWeight: 'bold',
                backgroundColor: theme === 'dark' ? 'rgb(107,142,35)' : 'rgb(255, 222, 176)',
              }}
              className='flex   mt-2 space-x-8  rounded-l rounded-full py-3 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 mr-2 '
            >
              <div>
                {svgElements.map((svg, svgIndex) => {
                  if (svgIndex === tabNameIndex) {
                    return svg;
                  } else {
                    return undefined;
                  }
                })}
              </div>
              <div
                className={
                  tabName === 'reminders'
                    ? 'text-gray-300 text-sm font-semibold tracking-wide capitalize dark:text-gray-700'
                    : 'text-gray-800 text-sm font-semibold tracking-wide capitalize dark:text-gray-200'
                }
              >
                {tabName}
              </div>
            </NavLink>
          );
        })}

        {uniqueLabel &&
          uniqueLabel.sort().map(
            (label) =>
              label !== null && (
                <NavLink
                  to={{
                    pathname: `/label/${label}`,
                    state: {
                      userid: userid,
                    },
                  }}
                  onClick={() => {
                    mutate(`${status}`);
                  }}
                  activeStyle={{
                    fontWeight: 'bold',
                    backgroundColor: 'rgb(255, 222, 176)',
                  }}
                  className='flex  p-4 space-x-8   rounded-l rounded-full py-3 px-6 hover:bg-gray-200 dark:hover:bg-gray-700  mr-2'
                >
                  {labelSvg}
                  <div className='text-gray-800 text-sm font-semibold tracking-wide dark:text-gray-200 dark:hover:bg-gray-700'>
                    {label}
                  </div>
                </NavLink>
              )
          )}
      </div>
    </>
  );
};

export default SideNavigationBar;
