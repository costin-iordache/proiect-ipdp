'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/backend/authContext';
import { logoutUser } from '@/backend/auth';

function LogoutButton() {
  const router = useRouter();
  const { isLoggedIn, userId, setIsLoggedIn, setUserId, hasLoggedOut } = useAuth();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setIsLoggedIn(false);
      setUserId(undefined);
      hasLoggedOut.current = true;
      router.push('/login');
      console.log(
        "AuthProvider useEffect - isLoggedIn:",
        isLoggedIn,
        "userId:",
        userId,
        "hasLoggedOut:",
        hasLoggedOut.current
      );
      return true;
    } else {
      console.error('Logout failed in AuthProvider:', result.error);
      return false;
    }
  };

  return (
    <div className="p-3 hover:bg-purple-700 rounded-xl cursor-pointer">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton;