// card = {icon.path, icon.alt, title, text}

const MenuCard = ({ icon, title, text }) => {
  return (
    <div className="card">
      <div className="card__pic">
        <img className="card__img" src={icon.path} alt={icon.alt} />
      </div>
      <div className="card__title">{title}</div>
      <div className="card__about">{text}</div>
    </div>
  );
};

export default MenuCard;
