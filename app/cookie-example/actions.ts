'use server';

import { cookies } from 'next/headers';

export async function createCookie(value: string) {
  (await cookies()).set('testCookie', value);
}
