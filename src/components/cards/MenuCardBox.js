import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";

const MenuCardBox = ({ titleCardId, menuMode, setMenuMode, classMenu }) => {
  const { menuButtons } = useSelector((state) => state.content);
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section
      className={menuMode ? "menu" : classMenu}
      onClick={handleMenuClick}
    >
      <div
        className={menuMode ? "container menu__box" : "container buttons__box"}
      >
        {menuButtons
          .filter((button) => button.id !== titleCardId)
          .map((card) => (
            <MenuCard
              card={card}
              key={card.id}
              menuMode={menuMode}
              setMenuMode={setMenuMode}
            />
          ))}
      </div>
    </section>
  );
};

export default MenuCardBox;
