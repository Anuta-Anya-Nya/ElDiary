import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// конфиг firebase сщздвется при регистрации приложения
const firebaseConfig = {
  apiKey: "AIzaSyCK5J5P3P7wFKwcZxdfQkp4vPj5lddB8rA",
  authDomain: "schooldiary-4849d.firebaseapp.com",
  projectId: "schooldiary-4849d",
  storageBucket: "schooldiary-4849d.appspot.com",
  messagingSenderId: "1047126929227",
  appId: "1:1047126929227:web:31c4be4cbc74d8c82a82ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// модули, используемые в проекте(аутентификация и fisestore)
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// onauthstatechanged firebase наблюдатель отслеживающий постоянство аутентификации
