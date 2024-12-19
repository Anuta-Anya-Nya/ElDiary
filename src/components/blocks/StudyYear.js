import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
const StudyYear = ({
  currentStudyYear,
  setCurrentYear,
  edit,
  setEdit,
  isCreate,
  text,
}) => {
  return (
    <div className="schedule__header">
      <div className="diary__header">
        {!edit && (
          <div className="homework__icons">
            <img
              className="icons"
              src={arrowLeft}
              alt="left"
              onClick={() => {
                setCurrentYear(currentStudyYear - 1);
              }}
            />
          </div>
        )}
        <h2 className="diary__title">
          Учебный год {currentStudyYear} - {currentStudyYear + 1}
        </h2>
        {!edit && (
          <div className="homework__icons">
            <img
              className="icons"
              src={arrowRight}
              alt="right"
              onClick={() => {
                setCurrentYear(currentStudyYear + 1);
              }}
            />
          </div>
        )}
      </div>

      {!edit && isCreate && (
        <button
          className="modal-submit-button"
          onClick={() => {
            setEdit(true);
          }}
        >
          Изменить {text}
        </button>
      )}
    </div>
  );
};

export default StudyYear;
