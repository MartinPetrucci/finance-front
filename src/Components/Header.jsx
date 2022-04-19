import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/header.css";

const Header = () => {
  const {pathname} = useLocation()
  // const ui = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const noHeaderRoutes = ['/login', '/register', '/forgot', '/test']

  const logOut = () => {
    console.log("log out");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header style={{ display: noHeaderRoutes.some(route => route === pathname) ? "none" : "flex" }}>
      <h1>Finance</h1>
      <nav>
        <ul>
          <li>
            <p onClick={logOut} className="logout">
              Log out
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
