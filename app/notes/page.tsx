import { redirect } from 'next/navigation';
import { getNotes } from '../../database/notes';
import { getUser } from '../../database/users';
import { getCookie } from '../../util/cookies';
import NotesForm from './NoteForm';

export default async function NotesPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie));

  // 3. If the user does not exist, redirect to the login with the returnTo query parameter
  if (!user) redirect('/login?returnTo=/notes');
  // 4. Display the notes for the current logged in user

  const notes = await getNotes(sessionCookie);

  return <NotesForm notes={notes} user={user} />;
}
