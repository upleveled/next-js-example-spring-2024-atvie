import { NextResponse } from 'next/server';
import { z } from 'zod';

type RootResponseBodyGet = {
  name: string;
};

const userSchema = z.object({
  name: z.string(),
});

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ name: '/api/animals' });
}

type RootResponseBodyPost =
  | {
      name: string;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RootResponseBodyPost>> {
  const requestBody = await request.json();

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          'You need to send an object with name property, eg. {"name": "Peter"}',
      },
      { status: 400 },
    );
  }

  console.log('good data', result.data);

  console.log('POST request body result', result);
  return NextResponse.json({ name: 'this is an animal POST' });
}
