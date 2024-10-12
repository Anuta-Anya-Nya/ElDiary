import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import TeacherCard from "./cards/TeacherCard";

function Teachers() {
  const titleCardId = 2;

  const teachersList = useSelector((state) => state.teachers.teachersList);

  //   Object.values(teachersList)
  //   .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
  //   .reduce((arr, teacher) => [...arr, teacher.id], []);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="teachers">
        <div className="container teachers__container">
          <div className="teachers__area">
            {Object.values(teachersList).map((teacher) => (
              <TeacherCard teacher={teacher} key={teacher.id} />
            ))}
          </div>
          <button className="modal-submit-button">
            Добавить нового учителя
          </button>
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
}

export default Teachers;
