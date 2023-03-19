import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import axios, {isAxiosError} from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {User} from "../../model/User";


type Inputs = {
  userId: number,
  password: string,
};

interface Props {
  currentUser: User | null;

  loginHandler: (user: User) => void;
}

export default function Login(props: Props) {

  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentUser)
      navigate('/', {replace: true})
  })

  const onSubmit: SubmitHandler<Inputs> = async (loginData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        userId: loginData.userId,
        password: loginData.password
      }, {withCredentials: true});
      props.loginHandler(response.data);
    } catch (e: any) {
      console.error(e)
      // if (isAxiosError(e)) {
      //   console.error(e.response?.data.message);
      // }
      return;
    } finally {
      navigate('/', {replace: true});
    }
  }

  return (
    <article>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='userId'>
          User ID
          <input type='number' id='userId'  {...register("userId", {required: true})}/>
        </label>
        {errors.userId && (
          <section>
            <small>This field is required</small>
          </section>
        )}
        <label htmlFor='password'>
          Password
          <input type='password' id='password' {...register("password", {required: true})}/>
        </label>
        {errors.password && (
          <section>
            <small>This field is required</small>
          </section>
        )}
        <button type='submit'>Log In</button>
      </form>
    </article>
  )
}