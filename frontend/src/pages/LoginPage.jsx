import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField.jsx';
import { useAuthStore } from '../../store/authUser.js';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'password must be atleast 8 character').required('Password is required'),
})


const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const {login} = useAuthStore();

  const handleLogin = (values) => {
    login({email: values.email, password: values.password});
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex item-center justify-between p-4'>
        <Link to={'/'}>
          <img src="/netflix-logo.png" alt="logo" className='w-52' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>
            Sign in
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleLogin}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {() => (
              <Form className='space-y-4'>
                <TextField
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='example@email.com'
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                />
                <TextField
                  label='password'
                  name='password'
                  type='password'
                  placeholder="*********"
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                />
                <button
                  type="submit"
                  className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
                >
                  Sign In
                </button>

                <div className='text-center text-gray-400'>
                  Don&apos;t have an account?{" "}
                  <Link to='/signup' className='text-red-500 cursor-pointer hover:underline transition duration-300 ease-in-out'>Sign Up</Link>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  )
}

export default LoginPage