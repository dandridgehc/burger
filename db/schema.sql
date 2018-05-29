DROP DATABASE IF EXISTS burger;
CREATE DATABASE burger;

USE burger;

CREATE TABLE burger(
  item_id INT AUTO_INCREMENT NOT NULL,
  burger_name VARCHAR(100) NOT NULL,
  devoured BOOLEAN NOT NULL,
  primary key(item_id)
);

