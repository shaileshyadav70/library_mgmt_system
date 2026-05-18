const express = require('express');

const userRouter = require('./Routes/user.js');
const booksRouter = require('./Routes/books.js');

const server = express();

server.use(express.json());

server.use('/users', userRouter);
server.use('/books', booksRouter);

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});