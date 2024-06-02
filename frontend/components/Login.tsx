import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Oval } from 'react-loader-spinner';
// @ts-ignore
import { baseUrl } from '../config/api.js';

const Login = ({ setUserToken }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem("user__token");
    if (userToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const result = await axios.post(`${baseUrl}/user/login`, { email, password });
      setLoading(false);

      if (result.data.token) {
        localStorage.setItem("user__token", result.data.token);
        setUserToken(result.data.token);
        toast.success(result.data.message || "Login success");
        navigate("/home");
      } else {
        toast.error(result.data.message || "Login failed");
        if (result.data.message === "User not found") {
          navigate("/register");
        }
      }
    } catch (err) {
      setLoading(false);
      // @ts-ignore
      toast.error(err.response?.data?.message || "An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
        <p className="mt-4 text-center">
          Continue without login? <Link to="/home" className="text-blue-500">Let's Go!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
