import MenuCardBox from "./cards/MenuCardBox";
import SettingDisplayHW from "./blocks/SettingDisplayHW";

const Settings = () => {
  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <h2>Настройки</h2>
        </div>
      </section>

      <section className="settings">
        <div className="container">
          <SettingDisplayHW />
        </div>
      </section>

      <MenuCardBox />
    </main>
  );
};

export default Settings;
