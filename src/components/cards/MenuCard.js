const MenuCard = (card) => {
  const { title, text, icon } = card.card;

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
