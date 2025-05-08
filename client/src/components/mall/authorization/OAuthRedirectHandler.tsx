import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setUser } from "../../../features/users/userSlice";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // This assumes the backend sends a cookie and user session
        const res = await axios.get(`http://localhost:5000/auth`, {
          withCredentials: true,
        });

        const user = res.data;

        // Store user in Redux or localStorage here
        dispatch(setUser(user));

        if (!user.isVerified) {
          navigate("/verify-email");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("OAuth Redirect Error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default OAuthRedirectHandler;
