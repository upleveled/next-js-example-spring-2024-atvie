// const fruitsCommentsCookie = cookies().get('fruitComments')?.value;

import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
  // Optional chaining operator, if cookies().get('testCookie') is undefined return undefined
  // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  // return cookies().get(name)?.value;
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // This is 24 hours
  sameSite: 'lax', // For cross site scripting
} as const;
