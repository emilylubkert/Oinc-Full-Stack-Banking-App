import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import { useUsers } from '../../contexts/userContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth  } from '../../contexts/Auth/authContext';
import '../../components.css';
import ContactButton from '../ContactButton';
import Logo from '../Logo';


function CreateAccount() {
  const ctx = useUsers();
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth, signup } = useAuth();

  let today = new Date();
  let date = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;

  const SignupForm = () => {
    return (
      <Formik
        validateOnMount
        initialValues={{ name: 'Chris', email: 'chris@duke.edu', password: '12345678' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          signup(values.name, values.email, values.password); 
          setShow(false);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <Field
                id='name'
                name='name'
                type='text'
                placeholder='Enter name'
                className='form-control'
              />
              <ErrorMessage name='name' />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email Address
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                placeholder='Enter email'
                className='form-control'
              />
              <ErrorMessage name='email' />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Enter password'
                className='form-control'
              />
              <ErrorMessage name='password' />
            </div>
            <button
              type='submit'
              className='btn btn-dark'
              disabled={isSubmitting || !isValid}
            >
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    );
  };

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Logo>
      <Card
        bgcolor='light'
        txtcolor='black'
        header='Create Account'
        body={
          show ? (
            <SignupForm />
          ) : (
            <>
              <h5>Success!</h5>
              <h6>Enjoy a $10 credit, just for signing up.</h6>
              <br />
              <div className='account-btns'>
                <button
                  type='submit'
                  className='btn btn-dark'
                  onClick={clearForm}
                >
                  Add Another Account
                </button>
                <Link className='btn btn-dark' role='button' to='../dashboard'>
                  Go To Dashboard
                </Link>
              </div>
            </>
          )
        }
      />
      <ContactButton />
    </Logo>
  );
}

export default CreateAccount;
