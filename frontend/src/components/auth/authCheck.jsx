import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { createContext, useContext } from "react";

const AuthContext = createContext();
function AuthCheck({ children, protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/getAuthenticatedUser`,
          { withCredentials: true }
        );
        const data = res.data;

        if (res.status === 200 || res.status === 201) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //   useEffect(() => {
  //     if (!loading) {
  //       if (user && !protectedRoute) {
  //         navigate("/");
  //       } else if (!user && protectedRoute) {
  //         navigate("/signUp");
  //       }
  //     }
  //   }, [user, loading, navigate, protectedRoute]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthCheck;

export const useAuth = () => useContext(AuthContext);