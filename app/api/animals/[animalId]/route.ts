import { NextResponse } from 'next/server';
import {
  deleteAnimalInsecure,
  getAnimalInsecure,
  updateAnimalInsecure,
} from '../../../../database/animals';
import { Animal } from '../../../../migrations/00000-createTableAnimals';
import { animalSchema } from '../route';

type AnimalResponseBodyGet =
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

type AnimalResponseBodyDelete =
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
  const animal = await deleteAnimalInsecure({
    id: Number(params.animalId),
  });

  if (!animal) {
    return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
  }
  return NextResponse.json({ animal: animal });
}

type AnimalResponseBodyPut =
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

  const updatedAnimal = await updateAnimalInsecure({
    id: Number(params.animalId),
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

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
