'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

// Case A: cookie is undefined (not set)
// Case B: cookie set, id doesn't exist yet
// Case C: cookie set, id exists already

export type FruitComment = {
  id: number;
  comment: string;
};

export async function createOrUpdateCookie(fruitId: number, comment: string) {
  // 1. Get current cookie
  const fruitsCommentsCookie = getCookie('fruitComments');

  // 2. Parse the cookie value
  let fruitComments = parseJson(fruitsCommentsCookie) as FruitComment[];

  // 3. If the parsed value is not an array, set it to an empty array
  if (!Array.isArray(fruitComments)) {
    fruitComments = [];
  }

  // 4. Update the cookie value
  const fruitToUpdate = fruitComments.find((fruitComment) => {
    return fruitComment.id === fruitId;
  });

  // Case B: cookie set, id doesn't exist yet
  if (!fruitToUpdate) {
    fruitComments.push({ id: fruitId, comment: comment });
  } else {
    // Case C: cookie set, id exists already
    fruitToUpdate.comment = comment;
  }

  // 5. Set the cookie to the updated value
  await cookies().set('fruitComments', JSON.stringify(fruitComments));
}
