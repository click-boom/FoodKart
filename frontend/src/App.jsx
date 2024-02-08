import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ClientHome from "./pages/ClientHome/ClientHome";
import AuthPage from "./pages/Login_Register/LoginPage";
import RegisterPage from "./pages/Login_Register/RegisterPage";
import AllRestaurantsPage from "./pages/Restaurants/AllRestaurants";
import TestPage from "./pages/Test";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<ClientHome />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route path="/restaurants" element={<AllRestaurantsPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
