// import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
// кастомный хук для отслеживания аутентификации
export const useAuth = () => {
  let email = null;
  let id = null;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      email = user.email;
      id = user.uid;
      // token = user.accessToken;

      // console.log(user);

      // ...
    } else {
      // User is signed out
      // ...
      console.log("user не найден");
    }

    return {
      isAuth: email ? true : false,
      email,
      id,
    };
  });
};
