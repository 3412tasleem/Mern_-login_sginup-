import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:9002/signup", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      {console.log("User", user)}
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter your name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter your Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-Enter your password "
        onChange={handleChange}
      />

      <div className="button" onClick={register}>
        SignUp
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default SignUp;
