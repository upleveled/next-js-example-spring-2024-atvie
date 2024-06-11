'use client';

import { useState } from 'react';
import { createOrUpdateCookie } from './actions';

type Props = {
  fruitId: number;
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState('');

  // // Alternative, in case you want to move the function out of the JSX
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setComment(event.currentTarget.value);
  // }

  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
        // // Alternative, in case you want to move the function out of the JSX
        // onChange={handleChange}
      />
      <button
        formAction={async () =>
          await createOrUpdateCookie(props.fruitId, comment)
        }
      >
        Add comment
      </button>
    </form>
  );
}
