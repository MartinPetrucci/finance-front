import "../Styles/login.css";
import { logIn } from "../Request/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import RegisterForm from "../Components/forms/RegisterForm";
const Login = () => {
  const [isLoginScreen, setisLoginScreen] = useState(false);

  console.log("render");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#loginForm");
    const userData = Object.fromEntries(new FormData(form));
    console.log(userData);
    try {
      const authUser = await logIn(userData);
      // dispatch({
      //   type: "setUser",
      //   payload: authUser
      // })
      localStorage.setItem("user", JSON.stringify(authUser));
      navigate("/", { replace: true });
    } catch (error) {
      //handle error
      console.log(error.message);
    }
  };

  const rojo = (e) => {
    const cortina = document.querySelector(".cortina");
    const izquierda = document.querySelector("#izquierda");
    const derecha = document.querySelector("#derecha");
    if (Array.from(cortina.classList).some((c) => c === "translateRight")) {
      cortina.classList.remove("translateRight");
      izquierda.classList.add("desvanecer");
      derecha.classList.remove("desvanecer");
    } else {
      cortina.classList.add("translateRight");
      izquierda.classList.remove("desvanecer");
      derecha.classList.add("desvanecer");
    }
  };

  return (
    <>
      <div className="fondo">
        <div className="cortina">
          <h1>Finance</h1>
        </div>
        <div className="izquierda desvanecer" id="izquierda">
          <div className="title">
            <h1>Register</h1>
          </div>
          <RegisterForm callback={rojo}/>
        </div>
        <div className="derecha">
          <div className="title">
            <h1>Log in</h1>
          </div>
          <form className="form" id="loginForm">
            <div className="inputs">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
              <p onClick={rojo} className="forgot">
                {/* <Link to="/forgot">Forgot password?</Link> */}
                Forgot password?
              </p>
            </div>
            <button className="signIn" onClick={signIn}>
              Sign in
            </button>
            <p className="signUp">
              Doesn't have an account? <span onClick={rojo}>Sign up</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
