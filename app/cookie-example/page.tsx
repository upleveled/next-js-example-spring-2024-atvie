import { getCookie } from '../../util/cookies';
import SetCookieForm from './SetCookieForm';

export default async function SetCookiePage() {
  const testCookieValue = await getCookie('testCookie');

  return (
    <>
      <div>Cookie Value: {testCookieValue}</div>
      <SetCookieForm />
    </>
  );
}
