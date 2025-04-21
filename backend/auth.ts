import { LoginResponse } from '@/types/auth';

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
}