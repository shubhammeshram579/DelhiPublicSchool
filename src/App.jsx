import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import RegistrationForm from "./Components/Pages/RegistrationForm";
import FillDetails from "./Components/Pages/FillDetails";
import PaymentPage from "./Components/Pages/PaymentPage";
import SuccessPage from "./Components/Pages/SuccessPage";
import MemberDashboard from "./Components/Pages/MemberDashboard";

function App() {
  const [token, setToken] = useState("");

  const Logout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await localStorage.getItem("authToken");
      setToken(storedToken);
    };
    fetchData();
  }, []);

  console.log("token", token);
  return (
    <>
      <BrowserRouter>
        <nav className="flex items-center justify-between">
          <div>
            <img
              src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png"
              alt=""
              className="h-20"
            />
          </div>
          <div className="flex gap-5">
            {token?.length > 0 && (
              <div className="flex items-center justify-between gap-4">
                <Link to="/MemberDashboard" className="text-lg">
                  Dashboard
                </Link>
                <Link to="/FillDetails" className="text-lg">
                  Fill
                </Link>
                <Link to="/PaymentPage" className="text-lg">
                  Payment
                </Link>
              </div>
            )}

            {!token?.length > 0 ? (
              <Link to="/">
                <button>Login</button>
              </Link>
            ) : (
              <Link to="/" className="text-lg text-red-500" onClick={Logout}>
                Logout
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RegistrationForm onLogin={setToken} />} />
          <Route path="/MemberDashboard" element={<MemberDashboard />} />
          <Route path="/FillDetails" element={<FillDetails />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
