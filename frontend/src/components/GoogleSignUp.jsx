import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GoogleSignUp() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState({})



  useEffect(() => {
    axios.get("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
      .then(response => {
        const apiResponse = response;
        setCountry(apiResponse)
      })
  }, []);


  async function handleCallbackResponse(response) {
    console.log(response.credential);

    let userObject = jwt_decode(response.credential);
    console.log(userObject);

    let res = await dispatch(userActions.signUpUsers({
      firstName: userObject.given_name,
      lastName: userObject.family_name,
      userPhoto: userObject.picture,
      email: userObject.email,
      country: country.data.country_name,
      password: userObject.sub,
      from: 'google'
    }))

    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message);
    }
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