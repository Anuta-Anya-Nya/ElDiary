const GradesRow = ({ lessonTitle, grades, number }) => {
  const totalGrade = grades.reduce((sum, el) => sum + el, 0) / grades.length;

  return (
    <>
      <div className="diary__cell">{number}.</div>
      <div className="diary__cell">{lessonTitle}</div>
      <div className="diary__cell">{grades.join(", ")}</div>
      <div className="diary__cell">{totalGrade}</div>
    </>
  );
};

export default GradesRow;
