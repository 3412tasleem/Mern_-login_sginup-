import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [user, setLoginUser] = useState({});

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
  }, []);

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user));
    setLoginUser(user);
  };
  return (
    <div className="App">
      <>
        <Router>
          <Switch>
            <Route path="/" exact>
              {user && user._id ? (
                <Homepage updateUser={updateUser} />
              ) : (
                <Login updateUser={updateUser} />
              )}
            </Route>
            <Route path="/login">
              <Login updateUser={updateUser} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
