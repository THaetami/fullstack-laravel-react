import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormErrors } from './Login';
import { FormInputRegis } from '../utils/dataInterface';
import baseUrl from '../utils/api-default';
import { useStateContext } from '../contexts/ContextProvider';
import { Helmet } from 'react-helmet-async';

import '../styles/views/form-sign-signup.scss';

import { BiSolidKey, BiSolidUser } from 'react-icons/bi';
import FormInput from '../component/FormInput';
import { IoIosMail } from 'react-icons/io';

export default function Register() {
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const navigate = useNavigate();

  const { setNotification } = useStateContext();

  const [form, setForm] = useState<FormInputRegis>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });


  useEffect(() => {
    const { name, email, password, passwordConfirmation } = form
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || passwordConfirmation.trim() === '') {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      password_confirmation: form.passwordConfirmation
    };

    baseUrl.post('/user', payload)
      .then(({ data }) => {
        console.log(data)
        navigate('/login');
        setNotification(`Silahkan login ${data.data.addedUser.name}`, 'success')
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | Itungin</title>
        <meta name='description' content='Register page itungin' />
      </Helmet>
      <div className='login-signup-form animated fadeInDown'>
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className='title'>
              Register for free
            </h1>

            {
              errors &&
              <div className='alert'>
                  {Object.keys(errors).map((key, index) => (
                    <p key={index}>{errors[key][0]}</p>
                  ))}
              </div>
            }

            <FormInput label="Name" type="text" name="name" value={form.name} onChange={handleInputChange} >
              <BiSolidUser />
            </FormInput>

            <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleInputChange}>
              <IoIosMail className="w-4 h-4"/>
            </FormInput>

            <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleInputChange}>
              <BiSolidKey />
            </FormInput>

            <FormInput label="Password Confirmation" type="password" name="passwordConfirmation" value={form.passwordConfirmation} onChange={handleInputChange}>
              <BiSolidKey />
            </FormInput>

            <button disabled={!formValid}  className={`${!formValid ? 'btn-disabled' : 'btn-enabled' } btn btn-block`}>Register</button>
            <p className='message'>
              Already registered? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
