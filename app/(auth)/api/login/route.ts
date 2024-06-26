import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserWithPasswordHashInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00006-createTableUsers';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'username'>;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // Task: Implement the user login workflow

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

  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'username or password not valid' }] },
      {
        status: 500,
      },
    );
  }

  // 4. Validate the user password by comparing with hashed password
  const passwordHash = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'username or password not valid' }] },
      {
        status: 500,
      },
    );
  }

  //  Coming in subsequent lecture
  // 5. Create a token
  // 6. Create the session record
  // 7. Send the new cookie in the headers

  // 8. Return the new user information without the password hash
  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}
