'use client';

import { useEffect, useState } from 'react';

export default function LocalStorage() {
  const [darkMode, setDarkMode] = useState('');

  useEffect(() => {
    // Set Value to local storage
    // window.localStorage.setItem('darkMode', true);

    // Remove value from local storage
    // window.localStorage.removeItem('darkMode');

    const localStorageDarkMode = window.localStorage.getItem('darkMode');

    // Narrowing: change the type of string | null to string
    if (typeof localStorageDarkMode === 'string') {
      // get value from local storage
      setDarkMode(localStorageDarkMode);
    }

    // // One TypeScript solution: set '' as the default,
    // // if the localStorage does not have a 'darkMode'
    // // property set
    // setDarkMode(window.localStorage.getItem('darkMode') || '');
  }, []);

  return <div>{darkMode ? darkMode : 'No dark mode set'}</div>;
}
