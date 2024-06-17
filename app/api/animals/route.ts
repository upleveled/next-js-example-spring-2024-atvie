import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';
import { Animal } from '../../../migrations/00000-createTableAnimals';

type AnimalsResponseBodyGet = {
  animals: Animal[];
};

export const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
  birthDate: z.coerce.date(),
});

// Warning: You probably don't need this, because you can just do
// a database query directly in your server component
export async function GET(): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({ animals: animals });
}

type AnimalsResponseBodyPost =
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

  const result = animalSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain animal object',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  const newAnimal = await createAnimalInsecure({
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

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
