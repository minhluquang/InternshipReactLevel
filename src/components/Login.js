import { useState } from "react";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or password is required!");
      return;
    }

    const res = await loginUser(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
    }
  };

  return (
    <div className="container-login col-5">
      <h3>Login</h3>
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-input">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>
      <button disabled={email && password ? false : true} onClick={handleLogin}>
        Log in
      </button>
      <NavLink to="/" className="go-back">
        <i className="fa-solid fa-angles-left"></i> Go back
      </NavLink>
    </div>
  );
};

export default Login;
