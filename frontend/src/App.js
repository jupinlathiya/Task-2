import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./bootstrap.min.css";
import LoginScreen from "./screens/loginScreen/loginScreen";
import RegisterScreen from "./screens/registerScreen/registerScreen";
import Header from "./components/Header/header";
import Home from "./screens/home/home";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserForm from "./screens/userForm/userForm";
function App() {
  const { userInfo } = useSelector((state) => state.userLogin);

  console.log("userInfo", userInfo);
  return (
    <Router>
      {userInfo && <Header />}

      <main className="App">
        <Routes>
          <Route path="/" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/userForm"
            element={userInfo ? <UserForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={userInfo ? <Home /> : <Navigate to="/login" />}
          />

        </Routes>
          <ToastContainer autoClose={2000} />
      </main>
    </Router>
  );
}

export default App;
