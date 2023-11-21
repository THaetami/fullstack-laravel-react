import { Link } from "react-router-dom";
import React, { useRef, useState } from 'react'
import '../styles/form-sign-signup.scss'


export interface FormErrors {
  [key: string]: string[];
}

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errors] = useState<FormErrors | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <input ref={emailRef} type="email" placeholder='Email' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Register ? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
