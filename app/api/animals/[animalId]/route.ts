import { NextResponse } from 'next/server';
import {
  deleteAnimal,
  getAnimalInsecure,
  updateAnimal,
} from '../../../../database/animals';
import {
  Animal,
  animalSchema,
} from '../../../../migrations/00000-createTableAnimals';
import { getCookie } from '../../../../util/cookies';

export type AnimalResponseBodyGet =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

type AnimalParams = {
  params: {
    animalId: string;
  };
};

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export async function GET(
  request: Request,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animal = await getAnimalInsecure(Number(params.animalId));

  if (!animal) {
    return NextResponse.json(
      { error: "Animal doesn't exist" },
      { status: 404 },
    );
  }
  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyDelete =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  // const animal = await deleteAnimalInsecure({
  //   id: Number(params.animalId),
  // });

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');
  const animal =
    sessionCookie &&
    (await deleteAnimal(sessionCookie, Number(params.animalId)));

  if (!animal) {
    return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
  }
  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyPut =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const requestBody = await request.json();

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
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

  // const updatedAnimal = await updateAnimalInsecure({
  //   id: Number(params.animalId),
  //   firstName: result.data.firstName,
  //   type: result.data.type,
  //   accessory: result.data.accessory || null,
  //   birthDate: result.data.birthDate,
  // });

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = await getCookie('sessionToken');

  const updatedAnimal =
    sessionCookie &&
    (await updateAnimal(sessionCookie, {
      id: Number(params.animalId),
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

  if (!updatedAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not created or access denied creating animals',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ animal: updatedAnimal });
}
