import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.css';

const RegisterForm = (props) => {
  const { isRegistered, onRegister, error } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    await onRegister(data, { current: isRegistered });
  };

  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBlock}>
          <input
            className={styles.input}
            placeholder="Your name"
            {...register('name', {
              required: 'This field is required!',
              minLength: {
                value: 3,
                message: 'Please enter a valid name!',
              },
            })}
          />
          {errors.name && (
            <p className={styles.warning}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.inputBlock}>
          <input
            className={styles.input}
            placeholder="Your surname"
            {...register('surname', {
              required: 'This field is required!',
              minLength: {
                value: 3,
                message: 'Please enter a valid surname!',
              },
            })}
          />
          {errors.surname && (
            <p className={styles.warning}>{errors.surname.message}</p>
          )}
        </div>
        <div className={styles.inputBlock}>
          <input
            className={styles.input}
            placeholder="example@mail.com"
            {...register('email', {
              required: 'This field is required!',
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
        <div className={styles.inputBlock}>
          <input
            type={'password'}
            className={styles.input}
            placeholder="Password"
            {...register('password', {
              required: 'This field is required!',
            })}
          />
          {errors.password && (
            <p className={styles.warning}>{errors.password.message}</p>
          )}
        </div>
        <span className={error ? styles.warning : ''}>{error}</span>
        <input
          disable={isDirty.toString()}
          className={styles.button}
          type="submit"
          value="Sign up"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
