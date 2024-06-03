'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState('');

  const router = useRouter();

  useEffect(() => {
    // DON'T USE THIS!!!
    // DON'T USE document.cookie
    const buttonColor = document.cookie
      .split('; ')
      .find((row) => row.startsWith('buttonColor='))
      ?.split('=')[1];

    setColor(
      buttonColor || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    );
  }, []);

  return (
    <button
      className={styles.generateButton}
      style={{ backgroundColor: color }}
      onClick={() => {
        const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        document.cookie = `buttonColor=${newColor}`;

        setColor(newColor);

        router.refresh();
      }}
    >
      generate
    </button>
  );
}
