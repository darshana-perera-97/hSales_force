import React from "react";
import errImage from "../Assets/404.png";

export default function Page404() {
  return (
    <div className="page404">
      <div className="d-flex-center">
        <img src={errImage} alt="404 image" />
      </div>
      <p>Page not Found</p>
    </div>
  );
}
