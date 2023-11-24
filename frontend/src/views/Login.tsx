import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FormInputLogin } from "../utils/dataInterface";
import baseUrl from "../utils/api-default";
import { useStateContext } from "../contexts/ContextProvider";
import '../styles/form-sign-signup.scss';


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
        console.log(data)
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
          <input name="email" onChange={handleInputChange} value={form.email} type="email" placeholder='Email' />
          <input name="password" onChange={handleInputChange} value={form.password}  type="password" placeholder='Password' />
          <button disabled={!formValid}  className={`${!formValid ? 'btn-disabled' : 'btn-e' } btn btn-block`}>Login</button>
          <p className='message'>
            Not Register ? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
