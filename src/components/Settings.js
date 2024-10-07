import MenuCardBox from "./cards/MenuCardBox";
import SettingDisplayHW from "./blocks/SettingDisplayHW";

const Settings = () => {
  const titleCardId = 5;
  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <h2>Настройки</h2>
        </div>
      </section>

      <section className="settings">
        <div className="container settings__box">
          <SettingDisplayHW />
          <div className="settings__item">
            <h3 className="settings__title">Расписание на учебный год</h3>
            <button className="modal-submit-button">
              Добавить на новый учебный год
            </button>
            <button className="modal-submit-button">Изменить текущее</button>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Список учителей</h3>
            <button className="modal-submit-button">
              Добавить нового учителя
            </button>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Список уроков</h3>
            <button className="modal-submit-button">Добавить урок</button>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Расписание звонков</h3>
            <button className="modal-submit-button">Добавить </button>
            <button className="modal-submit-button">Изменить </button>
          </div>
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Settings;
