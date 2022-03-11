import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Finance</h1>
      <nav>
        <ul>
          <li>
            <Link to="/month">Month</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/overview">Overview</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
