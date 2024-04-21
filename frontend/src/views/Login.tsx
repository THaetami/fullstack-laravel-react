import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FormInputLogin } from "../utils/dataInterface";
import baseUrl from "../utils/api-default";
import { useStateContext } from "../contexts/ContextProvider";
import { Helmet } from "react-helmet-async";

import '../styles/views/form-sign-signup.scss';

import { BiSolidKey } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import FormInput from "../component/FormInput";

export interface FormErrors {
  [key: string]: string[];
}

export default function Login() {
  const [formValid, setFormValid] = useState(false)
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const { setUser, setToken, setNotification } = useStateContext();

  const [form, setForm] = useState<FormInputLogin>({
    email: '',
    password: ''
  })

  useEffect(() => {
    const { email, password } = form
    if ( email.trim() === '' || password.trim() === '' ) {
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

    baseUrl.post('/auth', form)
      .then(({ data }) => {
        setToken(data.data.token);
        setUser(data.data.user);
        setNotification(`Selamat datang ${data.data.user.name}`, 'info')
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  };

  return (
    <>
      <Helmet>
        <title>Login | Itungin</title>
        <meta name='description' content='Login page itungin' />
      </Helmet>
      <div className='login-signup-form animated fadeInDown'>
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className='title'>
              Login into your accout
            </h1>

            {
              errors &&
              <div className='alert'>
                  {Object.keys(errors).map((key, index) => (
                    <p key={index}>{errors[key][0]}</p>
                  ))}
              </div>
            }

            <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleInputChange}>
              <IoIosMail className="w-4 h-4"/>
            </FormInput>

            <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleInputChange}>
              <BiSolidKey />
            </FormInput>

            <button disabled={!formValid}  className={`${!formValid ? 'btn-disabled' : 'btn-e' } btn btn-block`}>Login</button>
            <p className='message'>
              Not Register ? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
