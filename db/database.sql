CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(64) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.posts
(
    id bigint NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    post_text text COLLATE pg_catalog."default" NOT NULL,
    likes integer NOT NULL DEFAULT 0,
    fk_user_id integer,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_fk_user_id_fkey FOREIGN KEY (fk_user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.sessions
(
    token text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sessions
    OWNER to admin;