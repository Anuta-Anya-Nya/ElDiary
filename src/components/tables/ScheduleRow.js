import { useSelector } from "react-redux";

const ScheduleRow = ({ lessonInfo, index }) => {
  const { lessonId, cabinet, teacherId } = lessonInfo;
  const lesson = useSelector((state) => state.lessons.lessons[lessonId]);
  const teacher = useSelector(
    (state) => state.teachers.teachersList[teacherId]
  );

  return (
    <>
      <div className="diary__cell">{index + 1}.</div>
      <div className="diary__cell">{lesson && lesson.title}</div>
      <div className="diary__cell">{cabinet}</div>
      <div className="diary__cell">{teacher && teacher.name}</div>
    </>
  );
};

export default ScheduleRow;
