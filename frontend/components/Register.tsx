import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// @ts-ignore
import {baseUrl} from '../config/api.js';
const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("user__token");
    if (userToken) {
      navigate("/home");
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/user/register`, {
        name,
        email,
        password,
      })
      .then((result) => {
        if (result.data === "Already registered") {
          toast.error("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          toast.success("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="exampleInputName" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="exampleInputName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="exampleInputEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputPassword" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="exampleInputPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
