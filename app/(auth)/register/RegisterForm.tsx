'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { RegisterResponseBodyPost } from '../api/register/route';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody: RegisterResponseBodyPost = await response.json();

    if ('errors' in responseBody) {
      setErrors(responseBody.errors);
      return;
    }

    router.push(`/profile/${responseBody.user.username}`);

    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        username
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>

      <label>
        password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button>Register</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          <ErrorMessage>{error.message}</ErrorMessage>
        </div>
      ))}
    </form>
  );
}
