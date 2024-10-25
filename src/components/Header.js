import account from "../assets/icons/personal-account-account-svgrepo-com.svg";
import settings from "../assets/icons/setting-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { removeUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

function Header() {
  const { user } = useAuth();
  const greeting = `Привет, ${user?.email || "незнакомец"}!`;
  const [textButton, setTextButton] = useState(greeting);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (user) {
      setTextButton("Выйти из аккаунта");
    }
  };

  const handleMouseLeave = () => {
    setTextButton(greeting);
  };
  useEffect(() => {
    setTextButton(greeting);
  }, [greeting]);

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
                signOut(auth);
              }}
              onMouseEnter={() => {
                handleMouseEnter();
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
            >
              {textButton}
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
