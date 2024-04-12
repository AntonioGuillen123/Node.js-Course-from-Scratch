DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE message (
    id int PRIMARY KEY AUTO_INCREMENT,
    content text,
    user text
);