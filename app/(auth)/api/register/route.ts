import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  createUserInsecure,
  getUserInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00006-createTableUsers';

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data with zod
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exist in the database
  const user = await getUserInsecure(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username already taken' }] },
      {
        status: 401,
      },
    );
  }

  // 4. Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUserInsecure(result.data.username, passwordHash);

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Registration failed' }] },
      {
        status: 500,
      },
    );
  }

  // Coming in subsequent lecture
  // 6. Create a token
  // 7. Create the session record
  // 8. Send the new cookie in the headers

  return NextResponse.json({ user: newUser });
}
