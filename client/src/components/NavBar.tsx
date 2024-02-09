import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from 'react-responsive';

function NavBar() {
  const { store } = useContext(Context);
  const isMobile = useMediaQuery({ maxWidth: 470 });

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
        {isMobile ? (
            <li><FontAwesomeIcon icon={faCalendarDays} style={{
              width: 20,
              height: 20,
            }}/></li>
          ) : (
            <li>Calendar</li>
          )}
        </Link>
        {isMobile ? (
          <li onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} style={{
            width: 20,
            height: 20,
          }} /></li>
        ): (
           <li onClick={logout}>Log Out</li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
