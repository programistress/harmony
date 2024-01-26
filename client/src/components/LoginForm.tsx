import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

function isValidEmail(email: string) {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePass, setErrorMessagePass] = useState("");
  const [clickable, setClickable] = useState(true);

  const { store } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (password.length < 4 || password.length > 32) {
      setErrorMessagePass("Password must be between 4 and 32 characters");
      setClickable(false);
    } else {
      setErrorMessagePass("");
      setClickable(true);
    }
  }, [password]);

  useEffect(() => {
    if (!isValidEmail(email)) {
      setErrorMessageEmail("Please provide valid email address");
      setClickable(false);
    } else {
      setErrorMessageEmail("");
      setClickable(true);
    }
  }, [email]);

  const handleLogin = () => {
    store.login(email, password);
    navigate("/");
  };

  return (
    <form className="input__group">
      {errorMessageEmail == '' ?  <p></p> : <p className="error-message">{errorMessageEmail}</p>}
      {errorMessagePass == '' ?<p></p> :  <p className="error-message">{errorMessagePass}</p> }
      <input
        className="input"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        className="input mb-10"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button
        className={
          clickable ? "btn__startpage" : "btn__startpage pointerevents-none"
        }
        onClick={handleLogin}
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
