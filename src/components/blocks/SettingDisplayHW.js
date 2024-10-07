import { useDispatch, useSelector } from "react-redux";
import { changeDisplayHW } from "../../store/slices/settingSlice";

const SettingDisplayHW = () => {
  const currentHW = 0;
  const nextHW = 1;
  const userSelect = useSelector((state) => state.settings.displayHomeWork);
  const dispatch = useDispatch();

  return (
    <div className="settings__item">
      <h3 className="settings__title">Отображать домашнее задание:</h3>
      <div>
        <input
          type="radio"
          id="currentHW"
          name="homework"
          value={currentHW}
          checked={Number(currentHW) === userSelect}
          onChange={(el) => {
            dispatch(changeDisplayHW(Number(el.target.value)));
          }}
        />
        <label htmlFor="currentHW">На текущий день</label>
      </div>
      <div>
        <input
          type="radio"
          id="nextHW"
          name="homework"
          value={nextHW}
          checked={Number(nextHW) === userSelect}
          onChange={(el) => {
            dispatch(changeDisplayHW(Number(el.target.value)));
          }}
        />
        <label htmlFor="nextHW">На завтрашний день</label>
      </div>
    </div>
  );
};

export default SettingDisplayHW;
