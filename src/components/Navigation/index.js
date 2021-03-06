import React, { useContext } from "react";
import { Link } from "react-router-dom";

import SignOut from "../SignOut";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

function Navigation() {
  const authUser = useContext(AuthUserContext);
  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
}

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOut />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
