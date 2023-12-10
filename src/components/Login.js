import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

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
      <button disabled={email && password ? false : true}>Log in</button>
      <NavLink to="/" className="go-back">
        <i className="fa-solid fa-angles-left"></i> Go back
      </NavLink>
    </div>
  );
};

export default Login;
