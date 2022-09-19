import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ updateUser }) => {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      updateUser(res.data.user);
      history.push("/");
    });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        name="email"
        value={user.email}
        type="text"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        name="password"
        value={user.password}
        type="password"
        placeholder="Enter your password"
        onChange={handleChange}
      />

      <div className="button" onClick={login}>
        login
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/signup")}>
        SignUp
      </div>
    </div>
  );
};

export default Login;
