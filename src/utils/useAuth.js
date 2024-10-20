import { useSelector } from "react-redux";

// кастомный хук для отслеживания аутентификации
export const useAuth = () => {
  const { email, token, id } = useSelector((state) => state.user);
  console.log(email);
  return {
    isAuth: email ? true : false,
    email,
    token,
    id,
  };
};
