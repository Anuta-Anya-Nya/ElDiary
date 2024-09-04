import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";

function Diary() {
  const titleCardId = 1;
  const titleCard = useSelector((state) =>
    state.content.menuButtons.find((el) => el.id === titleCardId)
  );

  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <div className="card card-title">
            <div className="card__pic">
              <img
                className="card__img"
                src={titleCard.icon.path}
                alt={titleCard.icon.alt}
              />
            </div>
            <div className="card__title cart-title__title">
              {titleCard.title}
            </div>
          </div>
          <h2>Дневник</h2>
        </div>
      </section>
      <section className="diary">
        <div className="container diary-container">
          <div className="diary__area"></div>
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
}

export default Diary;
