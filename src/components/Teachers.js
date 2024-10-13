import { useDispatch, useSelector } from "react-redux";
import { openCloseModal } from "../store/slices/contentSlice";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import TeacherCard from "./cards/TeacherCard";
import { CustomModal } from "./customModal/CustomModal";

function Teachers() {
  const titleCardId = 2;

  const teachersList = useSelector((state) => state.teachers.teachersList);

  const dispatch = useDispatch();
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
          <button
            className="modal-submit-button"
            onClick={() => {
              dispatch(openCloseModal({ teacherModal: true }));
            }}
          >
            Добавить нового учителя
          </button>
        </div>
        <CustomModal />
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
}

export default Teachers;
