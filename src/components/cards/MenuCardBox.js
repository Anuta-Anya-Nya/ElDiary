import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";

const MenuCardBox = ({ titleCardId }) => {
  const { menuButtons } = useSelector((state) => state.content);

  return (
    <section className="buttons">
      <div className="container buttons__box">
        {menuButtons
          .filter((button) => button.id !== titleCardId)
          .map((card) => (
            <MenuCard card={card} key={card.id} />
          ))}
      </div>
    </section>
  );
};

export default MenuCardBox;
