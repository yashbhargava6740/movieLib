import './App.css';
import { useState } from 'react'; // Import useState hook
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem('user__token'));

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={userToken ? <Home /> : <Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserToken={setUserToken} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
