'use client';

import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../util/localStorage.js';
import styles from './CookieBanner.module.scss';

export default function CookieBanner() {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

  useEffect(() => {
    const localStorageValue = getLocalStorage('cookiePolicy');

    if (localStorageValue) {
      setAreCookiesAccepted(localStorageValue);
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
