import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    menuButtons: [
      {
        id: 1,
        icon: {
          path: require("../../assets/icons/ic-book.svg").default,
          alt: "дневник",
        },
        title: "Дневник",
        text: "Здесь ты можешь просмотреть дневник, записать в него домашнее задание и поставить свои оценки",
        link: "/diary",
      },
      {
        id: 2,
        icon: {
          path: require("../../assets/icons/ic-tech.svg").default,
          alt: "учителя",
        },
        title: "Учителя",
        text: "Здесь ты можешь просмотреть и записать информацию о твоих учителях",
        link: "/teachers",
      },
      {
        id: 3,

        icon: {
          path: require("../../assets/icons/ic-hands.svg").default,
          alt: "расписание звонков",
        },
        title: "Расписание звонков",
        text: "Здесь отображается расписание твоих звонков",
        link: "/rings",
      },
      {
        id: 4,
        icon: {
          path: require("../../assets/icons/grade.svg").default,
          alt: "оценки",
        },
        title: "Итоговые оценки",
        text: "Если ты выставляешь в свой дневник оценки, то тут найдешь свои оценки, которые могут получиться в четверти",
        link: "/grades",
      },
      {
        id: 5,
        icon: {
          path: require("../../assets/icons/ic-pencil.svg").default,
          alt: "блокнот",
        },
        title: "Блокнот",
        text: "Здесь ты можешь хранить свои записи",
        link: "/note",
      },
      {
        id: 6,
        icon: {
          path: require("../../assets/icons/ic-homework.svg").default,
          alt: "домашка",
        },
        title: "Домашняя работа",
        text: "Здесь ты увидишь свою домашку и сможешь отметить то, что уже выполнено",
        link: "/",
      },
      {
        id: 7,
        icon: {
          path: require("../../assets/icons/ic-dino.svg").default,
          alt: "расписание",
        },
        title: "Расписание уроков",
        text: "Здесь твое расписание на неделю",
        link: "/weekShedule",
      },
    ],
    openModal: {
      modalList: {
        lessonModal: false,
        homeWorkModal: false,
        gradeModal: false,
        notesModal: false,
        editDayModal: false,
        scheduleAddLesson: false,
      },
      modalData: {
        date: "",
        number: null,
      },
      modify: false,
      createMode: false,
    },
  },
  reducers: {
    addMenuButton: (state, action) => {
      state.push(action.payload);
    },
    openCloseModal: (state, action) => {
      Object.assign(state.openModal.modalList, action.payload);
    },
    saveModalData: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, modalData: action.payload },
      };
    },
    editModalData: (state, action) => {
      return {
        ...state,
        openModal: {
          ...state.openModal,
          modalData: { ...state.openModal.modalData, ...action.payload },
        },
      };
    },
    setModify: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, modify: action.payload },
      };
    },
    setCreate: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, createMode: action.payload },
      };
    },
  },
  //   редьюсеры для thunk функций
  //   extraReducers: (builder) => {
  //     builder.addCase(createUserThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //     builder.addCase(loginThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //   },
});
export const {
  addMenuButton,
  openCloseModal,
  saveModalData,
  editModalData,
  setModify,
  setCreate,
} = contentSlice.actions;
export const contentReducer = contentSlice.reducer;
