import api from '@/app/utils/axios';
import { logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try{
    const response= await api.post('/auth/logout', { method: 'POST' }); 
    if(response.status===200){
    logoutUser();
    router.push('/login');
    }
    else{
      throw new Error('Failed to log out');
    }
  }catch(error){
    console.error('Logout error:', error);
    alert('Logout failed: ' + (error as Error).message);
  } 
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
