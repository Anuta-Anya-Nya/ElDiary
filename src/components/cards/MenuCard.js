import { Link } from "react-router-dom";
const MenuCard = (card) => {
  const { title, text, icon, link } = card.card;

  return (
    <Link to={link} className="card">
      <div className="card__pic">
        <img className="card__img" src={icon.path} alt={icon.alt} />
      </div>
      <div className="card__title">{title}</div>
      <div className="card__about">{text}</div>
    </Link>
  );
};

export default MenuCard;
