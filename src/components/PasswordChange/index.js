import React, { useState } from "react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

function PasswordChange(props) {
  const [password, setPassword] = useState(INITIAL_STATE);
  const { firebase } = props;

  const { passwordOne, passwordTwo, error } = password;

  function handleSubmit(event) {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPassword({ ...INITIAL_STATE });
      })
      .catch((error) => {
        setPassword({ error });
      });

    event.preventDefault();
  }

  function handleChange(event) {
    setPassword({ ...password, [event.target.name]: event.target.value });
  }

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default withFirebase(PasswordChange);
