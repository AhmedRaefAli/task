CREATE DATABASE notesSystem;

CREATE TABLE note(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  BodyMessage VARCHAR(255),
  typeName VARCHAR(50) FOREIGN KEY,
  dateOfCreation Date ,
  username  VARCHAR(50) FOREIGN KEY,
);

CREATE TABLE user(
  username VARCHAR(50) PRIMARY KEY,
  profilePic VARCHAR(255),
);

CREATE TABLE noteType(
  typeName VARCHAR(50) PRIMARY KEY,
  disable Boolean,
);