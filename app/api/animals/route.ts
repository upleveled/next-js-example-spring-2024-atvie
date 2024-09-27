import { NextResponse } from 'next/server';
import { createAnimal, getAnimalsInsecure } from '../../../database/animals';
import {
  Animal,
  animalSchema,
} from '../../../migrations/00000-createTableAnimals';
import { getCookie } from '../../../util/cookies';

export type AnimalsResponseBodyGet = {
  animals: Animal[];
};

// Warning: You probably don't need this, because you can just do
// a database query directly in your server component
export async function GET(): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({ animals: animals });
}

export type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  const requestBody = await request.json();

  // Validation schema for request body
  const result = animalSchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    // error.issues [
    //   {
    //     code: 'invalid_type',
    //     expected: 'string',
    //     received: 'undefined',
    //     path: [ 'name' ],
    //     message: 'Required'
    //   }
    // ]
    return NextResponse.json(
      {
        error: 'Request does not contain animal object',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');

  const newAnimal =
    sessionCookie &&
    (await createAnimal(sessionCookie, {
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not created or access denied creating animals',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ animal: newAnimal });
}
