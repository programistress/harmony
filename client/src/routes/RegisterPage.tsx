import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {

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
        <h2 className="smaller-title">Create an account</h2>
        <div className="signup__socialmedia">
        <div className="signup__item">
          <img src="/google.png" alt="googlelogo" className="google__logo" />
          <p>Sign up with Google</p>
        </div>
        <div className="signup__item">
          <img src="/facebook.png" alt="googlelogo" className="fb__logo" />
          <p>Sign up with Facebook</p>
        </div>
        </div>
        <h3 className="or gray">- or -</h3>
          <RegisterForm />
        <div className="bottomthing__startpage">
          <h3 className="bottomthing__startpage-left">Already have an account?</h3>
          <Link to='/login'>
          <h3 className="bottomthing__startpage-signin ">Login</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;