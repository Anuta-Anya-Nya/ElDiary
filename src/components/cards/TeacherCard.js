import { useSelector } from "react-redux";

const TeacherCard = ({ teacher }) => {
  const { name, tel, birthdate, teachingLessons } = teacher;
  const lessons = useSelector((state) => state.lessons.lessons);

  return (
    <div className="card teachers__card">
      <div className="card__block">
        <h3 className="card__title">{name}</h3>
        <ul>
          {birthdate && <li>Дата рождения: {birthdate}</li>}
          {tel && <li>Телефон: {tel}</li>}
        </ul>
      </div>
      <div className="card__block">
        <h3 className="card__title">Преподает:</h3>
        <ul>
          {teachingLessons.map((lessonId, ind) => (
            <li key={ind}>{lessons[lessonId].title}</li>
          ))}
        </ul>
      </div>

      <button className="modal-submit-button">Изменить данные учителя</button>
    </div>
  );
};

export default TeacherCard;
