CREATE TABLE IF NOT EXISTS public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    skills text COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
     token text COLLATE pg_catalog."default",
    data json,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT id UNIQUE (id),
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.posts
(
    post_id character varying COLLATE pg_catalog."default" NOT NULL,
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    post_message character varying(255) COLLATE pg_catalog."default" NOT NULL,
    post_date character varying(255) NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (post_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to admin;


CREATE TABLE public.likes
(
    id character varying(255) NOT NULL,
    post_id character varying(255) NOT NULL,
    users_id character varying[],
    PRIMARY KEY (id),
    CONSTRAINT fk_post_id FOREIGN KEY (post_id)
        REFERENCES public.posts (post_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.likes
    OWNER to admin;


CREATE TABLE IF NOT EXISTS public.chats
(
    id text NOT NULL,
    user_1 text NOT NULL, 
    user_2 text NOT NULL, 
    chat_date character varying(255) NOT NULL,
    CONSTRAINT chats_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user_1 FOREIGN KEY (user_1)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_user_2 FOREIGN KEY (user_2)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chats OWNER to admin;

CREATE TABLE IF NOT EXISTS public.messages
(
    id character varying NOT NULL,
    sender_id character varying NOT NULL,
    receiver_id character varying NOT NULL,
    chat_id text NOT NULL,
    content text NOT NULL,
    message_date character varying NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT fk_chat_id FOREIGN KEY (chat_id)
        REFERENCES public.chats (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages OWNER to admin;