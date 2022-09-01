import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // console.log(watch('email'));
  // console.log(watch('name'));
  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          placeholder="Login"
          {...register('name', { required: 'This field is required' })}
        />
        {errors.name && <p className={styles.warning}>{errors.name.message}</p>}
      </div>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          placeholder="Password"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value:
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
              message: 'Please enter a valid E-mail!',
            },
          })}
        />
        {errors.email && (
          <p className={styles.warning}>{errors.email.message}</p>
        )}
      </div>

      <input className={styles.button} type="submit" />
    </form>
  );
};

const Login = (props) => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
