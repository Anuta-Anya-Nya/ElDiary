import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import account from "../assets/icons/personal-account-account-svgrepo-com.svg";
import settings from "../assets/icons/setting-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

function Header() {
  const dispatch = useDispatch();
  const email = useAuth().email;
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="header__logo">
          <span className="header__logo-bold">EL</span>Diary
        </Link>
        <nav>
          <ul className="header__menu">
            <li
              className="header__menu-item"
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              Привет, {email || "незнакомец"}!
            </li>
            <li className="header__menu-item">
              <Link to="/profile">
                <img className="icons" src={account} alt="Aккаунт" />
              </Link>
            </li>

            <li className="header__menu-item">
              <Link to="/settings">
                <img className="icons" src={settings} alt="Настройки" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
