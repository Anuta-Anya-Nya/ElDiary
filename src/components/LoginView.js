import { useState } from "react";
import { useAuth } from "../utils/useAuth";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { createUserThunk, loginThunk } from "../store/slices/userSlice";

const LoginView = () => {
  const isAuth = useAuth().isAuth;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  return !isAuth ? (
    <main className="main-autoriz">
      <section className="autoriz">
        <div className="container">
          <div className="autoriz__form">
            <input
              type="email"
              name="login"
              id="login"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <div className="autoriz__buttons">
              <button
                onClick={() => {
                  dispatch(createUserThunk({ email, pass }));
                }}
              >
                Зарегистрироваться
              </button>
              <button
                onClick={() => {
                  dispatch(loginThunk({ email, pass }));
                }}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <Navigate to="/homework" />
  );
};

export default LoginView;
