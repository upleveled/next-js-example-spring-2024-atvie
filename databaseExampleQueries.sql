-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database
-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(30),
  birth_date date NOT NULL
);

INSERT INTO
  animals (
    first_name,
    type,
    accessory,
    birth_date
  )
VALUES
  (
    'Lucia',
    'Lion',
    'Car',
    '2020-10-23'
  ),
  (
    'Macca',
    'Dog',
    'Comb',
    '2020-10-20'
  ),
  (
    'Jojo',
    'Dodo',
    'Dojo',
    '2020-04-10'
  ),
  (
    'Flo',
    'Parrot',
    'carrot',
    '2020-06-12'
  ),
  (
    'Bili',
    'Capybara',
    'Pen',
    '2020-10-16'
  );

-- Read some animals (R in CRUD - Read)
SELECT
  *
FROM
  animals;

CREATE DATABASE next_js_example_spring_2024_atvie;

CREATE USER next_js_example_spring_2024_atvie
WITH
  encrypted password 'next_js_example_spring_2024_atvie';

GRANT ALL privileges ON database next_js_example_spring_2024_atvie TO next_js_example_spring_2024_atvie;

-- \connect next_js_example_spring_2024_atvie
CREATE SCHEMA next_js_example_spring_2024_atvie AUTHORIZATION next_js_example_spring_2024_atvie;
