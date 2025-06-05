import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'

import './Header.css'

function Header() {

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white header shadow-sm">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <img src={Logo} alt="Logo" className="logo-image me-3" />
            <span className="logo">QuizZap</span>
          </div>

          <div className="navbar-nav ms-auto nav-buttons">
            <NavLink
              to="/"
              className={({ isActive }) => "nav-link" + (isActive ? " active-link" : "")}
              end
            >
              <i className="material-icons">home</i> Home
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) => "nav-link" + (isActive ? " active-link" : "")}
            >
              <i className="material-icons">leaderboard</i> Leaderboard
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header