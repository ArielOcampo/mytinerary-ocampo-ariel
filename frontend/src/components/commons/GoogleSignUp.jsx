import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLIENT_ID } from "../../consts/google";

import { UserActions } from "../../redux/actions";

const GoogleSignUp = () => {
  const [country, setCountry] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
      )
      .then((response) => {
        const apiResponse = response;
        setCountry(apiResponse);
      });
  }, []);

  const handleCallbackResponse = async (response) => {
    const userObject = jwt_decode(response.credential);

    const res = await dispatch(
      UserActions.signUpUsers({
        firstName: userObject.given_name,
        lastName: userObject.family_name,
        userPhoto: userObject.picture,
        email: userObject.email,
        country: country.data.country_name,
        password: userObject.sub,
        from: "google",
      })
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "filled_blue",
      size: "medium",
      shape: "pill",
      locale: "en-IN",
      text: "signup_with",
    });
  });

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
};
export default GoogleSignUp;
