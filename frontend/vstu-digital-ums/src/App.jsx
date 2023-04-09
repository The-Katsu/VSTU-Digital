import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import {useState} from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
      <Router>
        <Route exact path="/">
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
      </Router>
  );
}

export default App;


