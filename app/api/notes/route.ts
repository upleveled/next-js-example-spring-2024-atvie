import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createNote } from '../../../database/notes';
import { noteSchema } from '../../../migrations/00008-createTableNotes';

export type NotesResponseBodyPost =
  | {
      note: { textContent: string };
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<NotesResponseBodyPost>> {
  // Task: Create a note for the current logged in user

  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate notes data with zod
  const result = noteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain note object' },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. Create the note
  const newNote =
    sessionTokenCookie &&
    (await createNote(
      sessionTokenCookie.value,
      result.data.title,
      result.data.textContent,
    ));

  // 5. If the note creation fails, return an error
  if (!newNote) {
    return NextResponse.json(
      { error: 'Note not created or access denied creating note' },
      {
        status: 400,
      },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    note: {
      textContent: newNote.textContent,
    },
  });
}
