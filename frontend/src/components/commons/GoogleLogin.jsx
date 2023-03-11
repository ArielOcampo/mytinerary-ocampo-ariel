import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { UserActions } from "../../redux/actions";
import CLIENT_ID from "../../consts";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCallbackResponse = async (response) => {
    const userObject = jwt_decode(response.credential);

    const res = await dispatch(
      UserActions.loginUsers({
        firstName: userObject.given_name,
        lastName: userObject.family_name,
        userPhoto: userObject.picture,
        email: userObject.email,
        password: userObject.sub,
        from: "google",
      })
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/");
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
      text: "register_with",
    });
  });

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
};
export default GoogleLogin;
