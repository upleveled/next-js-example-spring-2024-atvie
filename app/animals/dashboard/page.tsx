import { redirect } from 'next/navigation';
import { getAnimals } from '../../../database/animals';
import { getValidSession } from '../../../database/sessions';
import { getCookie } from '../../../util/cookies';
import AnimalsForm from './AnimalsForm';

export const metadata = {
  title: 'Animal Admin page',
  description: 'Generated by create next app',
};

export default async function AnimalsPage() {
  // Task: Protect the dashboard page and redirect to login if the user is not logged in

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie));
  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo

  if (!session) {
    redirect('/login?returnTo=/animals/dashboard');
  }

  const animals = await getAnimals(session.token);

  // 4. If the sessionToken cookie is valid, allow access to dashboard page
  return <AnimalsForm animals={animals} />;
}
