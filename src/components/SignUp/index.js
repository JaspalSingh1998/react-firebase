import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

function SignUpFormBase(props) {
  const [user, setUser] = useState(INITIAL_STATE);

  const { firebase, history } = props;

  const { username, email, passwordOne, passwordTwo, error } = user;

  function handleSubmit(event) {
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error });
      });

    event.preventDefault();
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={username}
        onChange={handleChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm, SignUpLink };
