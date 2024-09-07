import { useEffect, useState } from "react";
import axiosInstance from "../Axois/Axois";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access_token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const userResponse = await axiosInstance.get('/user/auth/users/me/', {
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        });

        setUser(userResponse.data);
        setError(null);
      } catch (e) {
        console.error(e);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [access_token]);

  return { user, loading, error };
};
