import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // console.log(watch('email'));
  // console.log(watch('name'));
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          placeholder="Name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <div>
        <input
          placeholder="E-mail"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value:
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
              message: 'Please enter a valid E-mail!',
            },
          })}
        />
        {errors.email && <div>{errors.email.message}</div>}
      </div>

      <input type="submit" />
    </form>
  );
};

const Login = (props) => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};

export default Login;
