import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'


export default function GoogleSignUp() {
  const dispatch = useDispatch();


  async function handleCallbackResponse(response) {
    console.log(response.credential);

    let userObject = jwt_decode(response.credential);
    console.log(userObject);

    dispatch(userActions.signUpUsers({
      firstName: userObject.given_name,
      lastName: userObject.family_name,
      userPhoto: userObject.picture,
      email: userObject.email,
      password: userObject.sub,
      from: 'google'
    }))
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "915351353310-q8ga6v8c8j40s3s6h64mhok99dh1ct0e.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: "filled_blue", size: "medium", shape: "pill", locale: "en-US", text: "signup_with" },

    )
  });

  return (
    <div>
      <div id='buttonDiv' >

      </div>
    </div>
  )
}