export const SETTINGS = {
  CURRENT_HOMEWORK: 0,
  NEXT_HOMEWORK: 1,
};

export const LESSONS = {
  LESSONS_LIST: [
    "Русский язык",
    "Математика",
    "Литература",
    "История",
    "География",
    "Биология",
    "Английский язык",
    "Труды",
  ],
  DAILY_LESSON_ITEM: {
    lessonId: null,
    homework: null,
    grade: null,
    teacherId: null,
    cabinet: null,
  },
};

export const CONTENT = {
  LOAD_MES: "Загрузка...",
  ER404_MES: "упс, такой страницы не найдено",
  ADD_LESSON_ER_TITLE: "Название урока обязательно к заполению!",
  ADD_LESSON_ER_AVAIL:
    "Введенное название урока уже существует! Выберите другое",
  ADD_TEACHER_ER_NAME: "Имя учителя обязательно к заполению!",
  ADD_TEACHER_ER_LESSON:
    "Уроки, которые ведет учитель обязательны к заполнению!",
  ADD_TEACHER_ER_AVAIL: "Такой учитель уже существует!",
};

export const WEEKLY_SCHEDULE = {
  DAY_OF_WEEK: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  EMPTY_LIST: [
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
  ],
};

export const MENU_CARDS = {
  DIARY_ID: 1,
  TEACHERS_ID: 2,
  // LESSONS_ID: 5,
  HOMEWORK_ID: 6,
  SCHEDULE_ID: 7,
};
