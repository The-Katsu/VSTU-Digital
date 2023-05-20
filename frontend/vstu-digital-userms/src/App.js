import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
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
          <Routes>
              <Route exact path="/" element={isLoggedIn ? <HomePage/> : <Navigate to="/login"/>}/>
              <Route exact path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
          </Routes>
      </Router>
  );
}

export default App;


