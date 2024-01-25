import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <form className="input__group">
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
      <Link to={"/"}>
        <button
          className="btn__startpage"
          onClick={() => store.login(email, password)}
        >
          Log In
        </button>
      </Link>
    </form>
  );
}

export default LoginForm;
