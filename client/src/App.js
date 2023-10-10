import "./App.css";
import Main from './components/Main'

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import Signup from "./components/Singup";
import Login from "./components/Login/index";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Parts from "./Pages/Parts";
import Profile from "./Pages/Profile";
function App() {
  const user = localStorage.getItem("token");
  console.log(user);
  return (
    <Router>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/profile" element={<Profile />} />
       
      </Routes>
      
    </Router>
  );
}

export default App;
