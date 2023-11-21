import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormErrors } from './Login';
import '../styles/form-sign-signup.scss'


export default function Register() {

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);

  const [errors] = useState<FormErrors | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <input ref={nameRef} type="text" placeholder='Full Name' />
          <input ref={emailRef} type="email" placeholder='Email Address' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
          <button className='btn btn-block'>Register</button>
          <p className='message'>
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
