import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { FaMoon, FaSun } from "react-icons/fa";
// @ts-ignore
import { baseUrl } from '../config/api.js';

const Login = ({ setUserToken}: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("user__token");
    if (userToken) {
      navigate("/home");
    }

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(matchMedia.matches ? "dark" : "light");
      matchMedia.addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
      });

      return () => {
        matchMedia.removeEventListener("change", (e) => {
          setTheme(e.matches ? "dark" : "light");
        });
      };
    }
    
    const noticeTimer = setTimeout(() => {
      toast("Server requests might take a minute. Please wait...", {
        duration: 4000,
        position: "top-left",
        style: {
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
        },
      });
    }, 0);
    
    return () => clearTimeout(noticeTimer);
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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`flex flex-col justify-center items-center h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
      <Toaster />
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
      </button>
      <h1 className={`text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Welcome to MovieLIB</h1>
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
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} hover:shadow-2xl transition-shadow duration-300`}>
        <h2 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail" className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" : "bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-500"}`}
              id="exampleInputEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputPassword" className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" : "bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-500"}`}
              id="exampleInputPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className={`mt-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
