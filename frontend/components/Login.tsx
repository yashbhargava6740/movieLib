import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../src/App.css';
import toast from "react-hot-toast";

const Login = ({ setUserToken }: any) => {

  // Check if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem("user__token");
    if (userToken) {
      navigate("/home");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER}user/login`, { email, password })
      .then((result) => {
        // console.log(result);
        if (result.data.token) {
          // console.log("Login Success");
          localStorage.setItem("user__token", result.data.token);
          setUserToken(result.data.token); // Set the token in the App component (state management
          toast.success("login success");
          navigate("/home");
        } else if (result.data.message === "User not found") {
          toast.error("User not found. Please register first.");
          navigate("/register"); // Redirect to the registration page
        } else {
          // toast.error("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
