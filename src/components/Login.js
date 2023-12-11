import { useContext, useEffect, useState } from "react";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or password is required!");
      return;
    }
    setLoadingAPI(true);
    const res = await loginUser(email, password);
    if (res && res.token) {
      toast.success("Log in success!");
      loginContext(email, res.token);
      navigate("/");
    } else {
      // Error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container-login col-5">
      <h3>Login</h3>
      <label>Email or username ( eve.holt@reqres.in )</label>
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
      <button
        disabled={!(email && password) || loadingAPI}
        onClick={handleLogin}
      >
        {loadingAPI && <i className="fas fa-spinner fa-pulse"></i>}
        &nbsp;Log in
      </button>
      <NavLink to="/" className="go-back">
        <i className="fa-solid fa-angles-left"></i> Go back
      </NavLink>
    </div>
  );
};

export default Login;
