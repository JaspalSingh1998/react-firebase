import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

function PasswordForget() {
  return (
    <div>
      <h1>PasswordForget Page</h1>
      <PasswordForgetForm />
    </div>
  );
}

const INTIAL_STATE = {
  email: "",
  error: null,
};

function PasswordForgetFormBase(props) {
  const [user, setUser] = useState(INTIAL_STATE);
  const { firebase } = props;
  const { email, error } = user;

  function handleSubmit(event) {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setUser({ ...INTIAL_STATE });
      })
      .catch((error) => {
        setUser({ error });
      });

    event.preventDefault();
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const isInvalid = email === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
