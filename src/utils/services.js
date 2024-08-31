export const findLessonTitle = (lessonId) => {
  const lessons = [
    { id: 1, title: "Русский", teachers: [null] },
    { id: 2, title: "Математика", teachers: [null] },
    { id: 3, title: "Литература", teachers: [null] },
  ];
  if (!lessonId) return "Урока нет";
  const findingLesson = lessons.find((lesson) => lesson.id === lessonId);
  if (!findingLesson) return "Урока не найдено";
  return findingLesson.title;
};

export const buildTask = (lessonItem) => {
  const taskArr = [];
  lessonItem.homework.forEach((element) => {
    taskArr.push(
      `${element.task ? "упр. " : ""}${element.task || ""}${
        element.page ? " стр. " : ""
      }${element.page || ""} ${element.notes || ""}`
    );
  });
  return taskArr.join(", ");
};
