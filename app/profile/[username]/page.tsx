import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';
import { getCookie } from '../../../util/cookies';

export default async function UserProfile() {
  // Task: Add redirect to login page if user is not logged in

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }
  // 4. If user exists, render the page
  return <h1>{user.username}' Profile</h1>;
}
