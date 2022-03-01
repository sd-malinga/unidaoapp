import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const wallet = sessionStorage.getItem("wallet");
  console.log("this", wallet);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        wallet!== null ? <Component {...props} /> : <Redirect to="/vault" />
      }
    />
  );
}

export default ProtectedRoute;