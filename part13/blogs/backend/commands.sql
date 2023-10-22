CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0 
);

INSERT INTO blogs (author, url, title) VALUES ('Autor 1', 'https://blog1.com', 'Título del Blog 1');

INSERT INTO blogs (author, url, title, likes) VALUES ('Autor 2', 'https://blog2.com', 'Título del Blog 2', 15);

INSERT INTO blogs (author, url, title) VALUES ('Autor 3', 'https://blog3.com', 'Título del Blog 3');
