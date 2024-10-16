import moment from "moment/min/moment-with-locales.min";

export const buildTask = (lessonItem) => {
  const taskArr = [];
  lessonItem?.forEach((element) => {
    taskArr.push(
      `${element.task ? "упр. " : ""}${element.task || ""}${
        element.page ? " стр. " : ""
      }${element.page || ""} ${element.notes || ""}`
    );
  });
  return taskArr.join(", ");
};

export const findCurrentStudyYear = (currentDateMoment) => {
  return currentDateMoment.isBefore(
    moment(`${currentDateMoment.format("YYYY")}-09-01`)
  )
    ? Number(currentDateMoment.format("YYYY")) - 1
    : Number(currentDateMoment.format("YYYY"));
};

export function getWeekDaysInStore(currentDateMoment, schedules) {
  const startWeekDate = currentDateMoment.clone().startOf("week");
  const endWeekDate = currentDateMoment.clone().endOf("week");
  return Object.keys(schedules).filter((el) =>
    moment(el).isBetween(startWeekDate.clone().subtract(1, "days"), endWeekDate)
  );
}

export const findMissingDates = (currentDateMoment, schedules) => {
  const findingDates = getWeekDaysInStore(currentDateMoment, schedules);
  if (findingDates.length !== 7) {
    const missingDates = [];
    const startWeekDate = currentDateMoment.clone().startOf("week");
    const endWeekDate = currentDateMoment.clone().endOf("week");
    while (startWeekDate.isBefore(endWeekDate)) {
      if (!findingDates.includes(startWeekDate.format("YYYY-MM-DD"))) {
        missingDates.push(startWeekDate.format("YYYY-MM-DD"));
      }
      startWeekDate.add(1, "days");
    }
    return missingDates;
  }
  return [];
};

export function checkWeeklySchedule(
  currentDateMoment,
  schedules,
  dispatch,
  action
) {
  const missingDates = findMissingDates(currentDateMoment, schedules);
  console.log(currentDateMoment.format("YYYY-MM-DD"));
  if (missingDates.length > 0) {
    const newScheduleItems = missingDates.reduce((sheduleItems, date) => {
      sheduleItems[date] = {
        id: Date.now(),
        date,
        lessonsList: [
          {
            lessonId: null,
            homeworkId: null,
            grade: null,
            teacherId: null,
            cabinet: null,
          },
        ],
        notes: null,
        vacation: false,
        holiday: false,
      };
      return sheduleItems;
    }, {});
    dispatch(action(newScheduleItems));
  }
}

export const toChangeDate = (count, setter, step, dateMoment) => {
  if (count > 0) {
    setter(dateMoment.clone().add(step, "days"));
  } else {
    setter(dateMoment.clone().subtract(step, "days"));
  }
};

export const findTeacherForSelectLesson = (
  lessons,
  selectLessonId,
  teachers
) => {
  const teachersThisLesson = lessons[selectLessonId].teachers;
  if (!teachersThisLesson.length) {
    console.log(
      Object.values(teachers)
        .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
        .reduce((arr, teacher) => [...arr, teacher.id], [])
    );
    return Object.values(teachers)
      .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
      .reduce((arr, teacher) => [...arr, teacher.id], []);
  } else {
    return teachersThisLesson;
  }
};
