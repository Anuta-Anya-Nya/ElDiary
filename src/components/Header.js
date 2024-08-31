import account from "../assets/icons/personal-account-account-svgrepo-com.svg";
import settings from "../assets/icons/setting-svgrepo-com.svg";

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header__logo">
          <span className="header__logo-bold">EL</span>Diary
        </div>
        <nav>
          <ul className="header__menu">
            <li className="header__menu-item">Привет, Варя!</li>
            <li className="header__menu-item">
              <img className="icons" src={account} alt="Aккаунт" />
            </li>

            <li className="header__menu-item">
              <img className="icons" src={settings} alt="Настройки" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
