import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

function SignIn() {
  return (
    <div>
      <h1>SignIn Page</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

function SignInFormBase(props) {
  const [user, setUser] = useState(INITIAL_STATE);
  const { email, password, error } = user;

  const isInvalid = password === "" || email === "";

  const { firebase, history } = props;

  function handleSubmit(event) {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUser({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setUser({ error });
      });
    event.preventDefault();
  }
  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
