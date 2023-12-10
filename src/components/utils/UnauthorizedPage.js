import React from "react";
import { Link } from "react-router-dom";

import "../../styles/utils_css/UnauthorizedPage.css";

function UnAuthorizedPage() {
  return (
    <div className="unauthorized-outside-container">
      <div className="unauthorized-page-container">
        <h1>Unauthenticated!</h1>
        <p>You must be logged in to access this page.</p>
        <p>
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export { UnAuthorizedPage };
