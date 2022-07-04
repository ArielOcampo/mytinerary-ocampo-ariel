import React from 'react'
import Login from '../images/login.jpg'
import { Link as LinkRouter } from 'react-router-dom'
import GoogleLogin from './GoogleLogin';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target[0].value)
    const logedUser = {
      email: event.target[0].value,
      password: event.target[1].value,
      from: "form-Signup"
    };

    let res = await dispatch(userActions.loginUsers(logedUser))


    if (res.data.success) {

      toast.success(res.data.message)
      navigate('/')
    } else {
      toast.error(res.data.message);
    }
  }
  return (


    <div className="relative py-16
                " style={{ backgroundImage: `url(https://i.imgur.com/9SU1sGt.jpg`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">

        <div className="m-auto space-y-8 md:w-8/12 lg:w-full">


          <div className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
            <div className="lg:grid lg:grid-cols-2">
              <div className="rounded-lg lg:block" hidden>

                <img src={Login} className="rounded-l-xl object-cover w-full h-full" alt="music mood" />
              </div>
              <div className="p-6 sm:p-16">
                <h2 className="mb-8 text-center text-2xl text-cyan-900 font-bold">Sign in to your account</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input type="email" name="email" id="email" placeholder='example@gmail.com'
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
        focus:ring-2 focus:ring-sky-300 focus:outline-none
        invalid:ring-2 invalid:ring-red-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-gray-700">Password</label>

                    </div>
                    <input type="password" name="password" id="password"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                            focus:ring-2 focus:ring-sky-300 focus:outline-none
                                            invalid:ring-2 invalid:ring-red-400"
                    />
                  </div>

                  <button type="submit"
                    className="w-full py-3 px-6 rounded-md bg-sky-600
                                        focus:bg-sky-700 active:bg-sky-500">
                    <span className="text-white">Continue</span>
                  </button>
                  <hr className="w-full bg-gray-400" />
                  <p className="text-center font-medium leading-4 text-cyan-900 font-bold">OR</p>
                  <div className='flex justify-center'>
                    <GoogleLogin />

                  </div>

                  <p className=" pt-6 text-md">
                    Don't have an account ?
                    <LinkRouter to='/signup' className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                      {" "}
                      Sign up here
                    </LinkRouter>
                  </p>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


  )
}

export default LogIn