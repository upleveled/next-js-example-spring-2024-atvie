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
  const fruitsCommentsCookie = getCookie('fruitComments');

  let fruitComments = parseJson(fruitsCommentsCookie) as FruitComment[];

  if (!Array.isArray(fruitComments)) {
    fruitComments = [];
  }

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

  await cookies().set('fruitComments', JSON.stringify(fruitComments));
}
