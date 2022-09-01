import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostForm.module.css';

const PostForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    props.onAddNewPost(data.post);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Your post..."
        {...register('post', {
          required: 'This field must be filled!',
          maxLength: {
            value: 500,
            message: 'Limit of the message is 500 symbols!',
          },
        })}
      />
      {errors.post && <p className={styles.warning}>{errors.post.message}</p>}
      <input className={styles.button} type="submit" />
    </form>
  );
};

export default PostForm;
