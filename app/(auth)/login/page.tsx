import { redirect } from 'next/navigation';
import { getValidSession } from '../../../database/sessions';
import { getCookie } from '../../../util/cookies';
import { getSafeReturnToPath } from '../../../util/validation';
import LoginForm from './LoginForm';

type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};

export default async function LoginPage(props: Props) {
  // Task: Add redirect to home if user is logged in

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(props.searchParams.returnTo) || '/');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form
  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
