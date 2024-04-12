  DROP DATABASE IF EXISTS moviesdb;
  CREATE DATABASE moviesdb;
  
  USE moviesdb;
  
  CREATE TABLE movie(
	id BINARY(16) PRIMARY KEY DEFAULT UNHEX(REPLACE(UUID(), '-', '')),
    title varchar(255) NOT NULL,
    year int NOT NULL,
    director varchar(255) NOT NULL,
    duration int NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre(
	id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre(
	movie_id BINARY(16) NOT NULL,
    genre_id int NOT NULL, FOREIGN KEY (movie_id) REFERENCES movie(id), FOREIGN KEY (genre_id) REFERENCES genre(id),
    PRIMARY KEY(movie_id, genre_id)
);

-- Insertar géneros en la tabla genre
INSERT INTO genre (name) VALUES 
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance'),
('Biography'),
('Animation'),
('Fantasy');

-- Insertar películas en la tabla movie
INSERT INTO movie (title, year, director, duration, poster, rate) VALUES 
('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
('The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
('Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
('Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
('Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
('Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
('The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
('Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.6),
('The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 8.9),
('The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5),
('The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
('Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
('Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
('The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 7.7),
('Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 7.8);

-- Insertar géneros en la tabla genre

-- The Shawshank Redemption - Drama
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Drama' WHERE movie.title = 'The Shawshank Redemption';

-- The Dark Knight - Action
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Action' WHERE movie.title = 'The Dark Knight';

-- Inception - Sci-Fi
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Sci-Fi' WHERE movie.title = 'Inception';

-- Pulp Fiction - Crime
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Crime' WHERE movie.title = 'Pulp Fiction';

-- Forrest Gump - Romance
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Romance' WHERE movie.title = 'Forrest Gump';

-- Gladiator - Action
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Action' WHERE movie.title = 'Gladiator';

-- The Matrix - Sci-Fi
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Sci-Fi' WHERE movie.title = 'The Matrix';

-- Interstellar - Sci-Fi
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Sci-Fi' WHERE movie.title = 'Interstellar';

-- The Lord of the Rings: The Return of the King - Fantasy
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Fantasy' WHERE movie.title = 'The Lord of the Rings: The Return of the King';

-- The Lion King - Animation
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Animation' WHERE movie.title = 'The Lion King';

-- The Avengers - Action
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Action' WHERE movie.title = 'The Avengers';

-- Jurassic Park - Adventure
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Adventure' WHERE movie.title = 'Jurassic Park';

-- Titanic - Romance
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Romance' WHERE movie.title = 'Titanic';

-- The Social Network - Biography
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Biography' WHERE movie.title = 'The Social Network';

-- Avatar - Sci-Fi
INSERT INTO movie_genre (movie_id, genre_id) SELECT movie.id, genre.id FROM movie INNER JOIN genre ON genre.name = 'Sci-Fi' WHERE movie.title = 'Avatar';

-- La función HEX() sirve para transformar un binario en un decimal
SELECT HEX(id), title FROM movie;