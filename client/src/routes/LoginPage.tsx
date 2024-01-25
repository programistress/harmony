import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { Context } from "../main";


function LoginPage() {

  const { store } = useContext(Context);

  return (
    <div className="container__row">
      <div>
      <h1 className="title greeting">Hello lovely ૮ ˶ᵔ ᵕ ᵔ˶ ა</h1>
      <h1 className="title greeting">
        Welcome to <span className="pink">Harmony</span> –
        your personalized period companion. We're here to help you navigate
        through each phase of your menstrual cycle with ease and empowerment.
      </h1>
      </div>
      <div className="wrapper__signin">
        <h2 className="smaller-title">Log in to your account</h2>
        {/* <div className="signup__socialmedia">
        <div className="signup__item">
          <img src="/google.png" alt="googlelogo" className="google__logo" />
          <p>Sign in with Google</p>
        </div>
        <div className="signup__item">
          <img src="/facebook.png" alt="googlelogo" className="fb__logo" />
          <p>Sign in with Facebook</p>
        </div>
        </div>
        <h3 className="or gray">- or -</h3> */}
          <LoginForm />
        <div className="bottomthing__startpage">
          <h3 className="bottomthing__startpage-left">Don't have an account?</h3>
          <Link to='/register'>
          <h3 className="bottomthing__startpage-signin ">Register</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
