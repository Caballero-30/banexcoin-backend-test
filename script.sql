--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS banexcoin_backend_test;
--
-- Name: banexcoin_backend_test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE banexcoin_backend_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';


ALTER DATABASE banexcoin_backend_test OWNER TO postgres;

\connect banexcoin_backend_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: insertclient(character varying, character varying, date, text, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insertclient(first_name character varying, last_name character varying, birthdate date, address text, status boolean, OUT returning_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO client(first_name, last_name, address, birthdate, status)
    VALUES (first_name, last_name, address, birthdate, status)
    RETURNING id
    INTO returning_id;

    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION '%', SQLERRM;
END;
$$;


ALTER FUNCTION public.insertclient(first_name character varying, last_name character varying, birthdate date, address text, status boolean, OUT returning_id integer) OWNER TO postgres;

--
-- Name: updateclient(integer, character varying, character varying, date, text, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.updateclient(key integer, f_name character varying, l_name character varying, b_date date, new_address text, new_status boolean) RETURNS date
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS(SELECT FROM client WHERE id = key) THEN
        UPDATE client SET
            updated = CURRENT_DATE,
            first_name = f_name,
            last_name = l_name,
            address = new_address,
            birthdate = b_date,
            status = new_status
        WHERE id = key;

        RETURN (SELECT created FROM client WHERE id = key);
    ELSE RAISE EXCEPTION 'Row does not exist';
    END IF;

    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION '%', SQLERRM;
END;
$$;


ALTER FUNCTION public.updateclient(key integer, f_name character varying, l_name character varying, b_date date, new_address text, new_status boolean) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id integer NOT NULL,
    created date DEFAULT CURRENT_DATE NOT NULL,
    updated date,
    status boolean NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    address text NOT NULL,
    birthdate date NOT NULL
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, created, updated, status, first_name, last_name, address, birthdate) FROM stdin;
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 18, true);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

