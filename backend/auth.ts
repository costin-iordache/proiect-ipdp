import { LoginResponse, RegisterResponse } from '@/types/auth';

export async function loginUser(email: string, password: string): Promise<{ response?: Response; data?: LoginResponse; error?: string }> {
  try {
    const response = await fetch('http://ipdp.local/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password }).toString(),
    });

    const data: LoginResponse = await response.json(); // Explicitly type data
    return { response, data };
  } catch (error: unknown) {
    console.error('Error during fetch in loginUser:', error);
    return { error: 'Failed to connect to the server' };
  }
};

export async function registerUser(
  email: string,
  password: string,
  // confirmPassword?: string // Optional confirm password
): Promise<{ response?: Response; data?: RegisterResponse; error?: string }> {
  try {
    const bodyParams = new URLSearchParams({ email, password });

    const response = await fetch('http://ipdp.local/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    const data: RegisterResponse = await response.json();
    return { response, data };
  } catch (error: unknown) {
    console.error('Error during fetch in registerUser:', error);
    return { error: 'Failed to connect to the server' };
  }
}