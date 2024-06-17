import { NextResponse } from 'next/server';
import { z } from 'zod';

type RootResponseBodyGet = {
  name: string;
};

const userSchema = z.object({
  name: z.string(),
});

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

  // false -- > { success: false, error: [Getter] }
  // true -- > { success: true, data: { name: 'Peter' } }
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
