import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './DialogForm.module.css';

const DialogForm = (props) => {
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
    props.onSendNewMessageClick(data.newMessage);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Yor message..."
        {...register('newMessage', {
          required: 'This field is required!',
          minLength: {
            value: 1,
          },
          maxLength: {
            value: 300,
            message: 'Limit of the message is 300 symbols!',
          },
        })}
      />
      {errors.newMessage && (
        <p className={styles.warning}>{errors.newMessage.message}</p>
      )}
      <input className={styles.button} type="submit" />
    </form>
  );
};

export default DialogForm;
