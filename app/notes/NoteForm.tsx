'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../migrations/00006-createTableUsers';
import { Note } from '../../migrations/00008-createTableNotes';
import styles from './NotesForm.module.scss';

type Prop = {
  notes: Note[];
  user: Pick<User, 'username'>;
};

export default function NotesForm(props: Prop) {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <>
      <h1>Notes for {props.user.username}</h1>

      <div className={styles.notes}>
        <div>
          {props.notes.length === 0 ? (
            'No notes yet'
          ) : (
            <ul>
              {props.notes.map((note) => (
                <li key={`notes-${note.id}`}>
                  <Link href={`/notes/${note.id}`}>{note.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.notesForm}>
          <div>
            <h2>Create Note</h2>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const response = await fetch('/api/notes', {
                  method: 'POST',
                  body: JSON.stringify({
                    title,
                    textContent,
                  }),
                });

                setErrorMessage('');

                if (!response.ok) {
                  let newErrorMessage = 'Error creating note';

                  try {
                    const body = await response.json();
                    newErrorMessage = body.error;
                  } catch (error) {
                    // Don't fail if response JSON body
                    // cannot be parsed
                    console.log(error);
                  }

                  // TODO: Use toast instead of showing
                  // this below creation / update form
                  setErrorMessage(newErrorMessage);
                  return;
                }

                setTitle('');
                setTextContent('');

                router.refresh();
              }}
            >
              <label>
                Title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </label>

              <label>
                Note
                <input
                  value={textContent}
                  onChange={(event) =>
                    setTextContent(event.currentTarget.value)
                  }
                />
              </label>

              <button>Add Note</button>
            </form>

            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    </>
  );
}
