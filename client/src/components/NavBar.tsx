import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

function NavBar() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const navigate = useNavigate()

  const logout = () => {
    store.logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h3 className="logo">Harmony</h3>
      </Link>
      <ul className="navbar__right">
        <Link to={"/calendar"}>
          <li>Calendar</li>
        </Link>
        <Link to={"/articles"}>
          <li>Articles</li>
        </Link>
        <li onClick={logout}>Log Out</li>
      </ul>
    </nav>
  );
}

export default NavBar;
