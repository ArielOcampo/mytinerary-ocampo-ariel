import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import Fondo from '../images/fondo-carousel.png'
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LogIn = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target[1].value)
    const logedUser = {
      email: event.target[0].value,
      password: event.target[1].value,
      from: "form-Signup"
    };

    let res = await dispatch(userActions.loginUsers(logedUser))
    console.log(res)

    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message);
    }
  }



  return (
    <>

      <div className="bg-blue-900" style={{ backgroundImage: `url(${Fondo})` }}>

        <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center" >
          <div className=" md:hidden sm:mb-8 mb-6" >

          </div>

          <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6" >
            <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
              Login to your account
            </p>
            <p tabIndex={0} className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
              Dont have account?{" "}
              <LinkRouter to='/signup' className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                {" "}
                Sign up here
              </LinkRouter>
            </p>

            <button aria-label="Continue with google" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100">
              <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
              </svg>
              <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
            </button>

            <button aria-label="Continue with twitter" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-4 hover:bg-gray-100">
              <svg width={19} height={20} viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg" ><path fill="#1976D2" d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z" /><path fill="#FAFAFA" fillRule="evenodd" d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z" clipRule="evenodd" /></svg>
              <p className="text-base font-medium ml-4 text-gray-700">Continue with Facebook</p>
            </button>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex items-center justify-between py-5">
                <hr className="w-full bg-gray-400" />
                <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>
                <hr className="w-full bg-gray-400" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium leading-none text-gray-800">
                  {" "}
                  Email{" "}
                </label>
                <input id="email" name='email' aria-labelledby="email" type="email" className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2" placeholder="john@gmail.com " />
              </div>
              <div className="mt-6 w-full">
                <label htmlFor="myInput" className="text-sm font-medium leading-none text-gray-800">
                  {" "}
                  Password{" "}
                </label>
                <div className="relative flex items-center justify-center">

                  <input type='password' id="password" name='password' className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                  <div className="absolute right-0 mt-2 mr-3">


                  </div>

                </div>
              </div>

              <div className="mt-8">
                <button type='submit' className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                  LOGIN
                </button>
              </div>
            </form>

          </div>
          <div className="xl:w-1/3 md:w-1/2 lg:ml-16 ml-8 md:mt-0 mt-6" >

            <div className="flex items-start mt-8" >
              <p className="sm:text-2xl text-xl leading-7 text-white pl-2.5">Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears</p>
            </div>
            <div className="flex items-center pl-8 mt-10">


            </div>
          </div>

        </div>
      </div>
    </>
  )
}


export default LogIn