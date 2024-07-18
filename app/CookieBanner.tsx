'use client';

import { useEffect, useState } from 'react';
import { parseJson } from '../util/json';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import styles from './CookieBanner.module.scss';

export default function CookieBanner() {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

  // // In case you are using state variables with multiple different
  // // possible types
  // const [areCookiesAccepted, setAreCookiesAccepted] = useState<
  //   boolean | string
  // >(false);

  useEffect(() => {
    const localStorageValue = getLocalStorage('cookiePolicy');

    if (localStorageValue) {
      setAreCookiesAccepted(Boolean(parseJson(localStorageValue)));
      // // Another way: Convert string to boolean
      // setAreCookiesAccepted(Boolean(localStorageValue));
    } else {
      setAreCookiesAccepted(false);
    }
  }, []);

  return (
    <div
      className={`${styles.cookieBanner} ${areCookiesAccepted ? styles.closed : styles.open}`}
    >
      <div>Do you accept the use of Cookies?</div>
      <button
        className={styles.button}
        onClick={() => {
          setAreCookiesAccepted(true);
          setLocalStorage('cookiePolicy', JSON.stringify(true));
        }}
      >
        Accept
      </button>
    </div>
  );
}
