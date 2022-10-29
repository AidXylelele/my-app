CREATE TABLE IF NOT EXISTS public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT id UNIQUE (id),
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.sessions
(
    token text COLLATE pg_catalog."default" NOT NULL,
    data json NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sessions
    OWNER to admin;