import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

function RegisterForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  const navigate = useNavigate()

  const handleRegistration = async () => {
    try {
      await store.registration(email, password, username);
      // Navigate to the "/questions" route
      navigate("/questions");
    } catch (error) {
      // Handle errors if necessary
      console.error("Registration failed:", error);
    }
  };

  return (
    <form className="input__group">
       <input
        className="input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
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
      <Link to={"/questions"}>
      <button className="btn__startpage" onClick={handleRegistration}>Register</button>
      </Link>
    </form>
  );
}

export default RegisterForm;
