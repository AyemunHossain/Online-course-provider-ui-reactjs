import axios from "axios";
import jwt from "jwt-decode";

const instance = axios.create({
  baseURL: "https://backend.techcyrus.com/",
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }
    
    // Here try to impletement  something that can detect if there is no
    // access token and then try to loginwith refresh token if not then just remove the refresh token
    // try{
    //   access_token = localStorage.getItem("access_token");
    //   if
    // }

        

    if (
      error.response.status === 401 &&
      originalRequest.url ===
        process.env.REACT_APP_BACKEND_API + "api/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      localStorage.removeItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      var token;

      if (refreshToken !== "undefined") {
        try {
          token = jwt(refreshToken, { completed: true });
          const tokenParts = token;
          const now = Math.ceil(Date.now() / 1000);

           console.log(tokenParts.exp);
           // exp date in token is expressed in seconds, while now() returns milliseconds:
           if (tokenParts.exp > now) {
             console.log("Trying to take the access token with refrsh token")
             return instance
               .post("api/token/refresh/", {
                 refresh: refreshToken,
               })
               .then((response) => {
                 localStorage.setItem("access_token", response.data.access);

                //  alert(`Successfully logged in with refresh token`)

                 instance.defaults.headers["Authorization"] =
                   "JWT " + response.data.access;
                 originalRequest.headers["Authorization"] =
                   "JWT " + response.data.access;

                 return instance(originalRequest);
               })
               .catch((err) => {
                 console.log(err);
               });
           } else {
             console.log("Refresh token is expired", tokenParts.exp, now);
             window.location.href = "/login/";
           }

        } catch {
          window.location.href = "/login/";
        }
        
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }
    else {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken === "undefined") {
        localStorage.removeItem("refresh_token");
      }
    }


    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default instance;
