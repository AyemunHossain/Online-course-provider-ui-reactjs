import React, { useEffect } from "react";
import instance from "src/axios/axiosHeader";
import { useHistory } from "react-router";

export default function SignUp() {
  const history = useHistory();

  useEffect(() => {
    const response = instance.post("logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    instance.defaults.headers["Authorization"] = null;
    history.push("/login");

  });
  return <div>Logout</div>;
}
