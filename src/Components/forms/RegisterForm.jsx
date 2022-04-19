import { register } from "../../Request/axios";

const RegisterForm = ({callback}) => {

    const signUp = async (e) => {
        e.preventDefault()
        const form = document.querySelector("#registerForm")
        const userData = Object.fromEntries(new FormData(form))
        console.log({userData})
        try {
            const response = await register(userData)
            console.log(response)
            callback()
        } catch (error) {
            console.error(error)            
        }
    }

  return (
    <>
      <form className="form" id="registerForm">
            <div className="inputsRegister">
              <div className="name">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" />
              </div>

              <div className="surname">
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="text" name="surname" />
              </div>

              <div className="full">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
              </div>

              <div className="full">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" />
              </div>

              <div className="password">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
              </div>

              <div className="confirmPassword">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" />
              </div>
            </div>
            <button className="signIn" onClick={signUp}>
              Sign up
            </button>
          </form>
    </>
  );
};

export default RegisterForm;
