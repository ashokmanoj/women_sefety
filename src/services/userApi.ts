import Cookies from 'js-cookie';

// ✅ Replace or define this interface according to your backend response
interface User {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
}

const API_BASE_URL = 'https://women-safety-server-side.onrender.com/api/user';
// const API_BASE_URL = 'http://localhost:5002/api/user';

export const userApi = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Invalid credentials');

    const user: User = await response.json();

    // ✅ Set cookies securely for 7 days
    Cookies.set('user_id', user.id, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('user_name', user.name, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('user_email', user.email, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('access_token', user.accessToken ?? '', { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('refresh_token', user.refreshToken ?? '', { expires: 7, secure: true, sameSite: 'Strict' });

    return user;
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) throw new Error('Failed to create account');

    const user: User = await response.json();

    Cookies.set('user_id', user.id, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('user_name', user.name, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('user_email', user.email, { expires: 7, secure: true, sameSite: 'Strict' });

    return user;
  },
};
