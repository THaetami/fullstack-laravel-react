import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormErrors } from './Login';
import { FormInputRegis } from '../utils/dataInterface';
import baseUrl from '../utils/api-default';
import { useStateContext } from '../contexts/ContextProvider';
import '../styles/form-sign-signup.scss';


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

    baseUrl.post('/users', payload)
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
          <input name="name" value={form.name} onChange={handleInputChange} type="text" placeholder='Full Name' />
          <input name="email" value={form.email} onChange={handleInputChange} type="email" placeholder='Email Address' />
          <input name="password" value={form.password} onChange={handleInputChange} type="password" placeholder='Password' />
          <input name="passwordConfirmation" value={form.passwordConfirmation} onChange={handleInputChange} type="password" placeholder='Password Confirmation' />
          <button disabled={!formValid}  className={`${!formValid ? 'btn-disabled' : 'btn-enabled' } btn btn-block`}>Register</button>
          <p className='message'>
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
