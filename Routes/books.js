const express = require('express');

const bookApp = express.Router();

const books = require("../data/books.json")
const users = require("../data/user.json")

bookApp.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        data: books,
    })
})

bookApp.get('/:id', (req, res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id === Number(id));

    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user,
    })
})

bookApp.post('/', (req, res)=>{
    // "id": 3,
    //   "title": "Clean Code",
    //   "author": "Robert C. Martin",
    //   "price": 799,
    //   "available": false

    const {id, title, author, price, available} = req.body;
    if(!id || !title || !author || !price || !available){
        return res.status(404).json({
            success:false,
            message: "Provide all required field"
        })
    }

    const book = books.find((each)=> each.id === Number(id) || each.name === name);
    if(book){
        return res.status(409).json({
            success:false,
            message: `${book.id} is already exist`
        })
    }
    
    books.push({id, title, author, price, available})

    res.status(201).json({
        success: true,
        message: `${title} is registerd successfuly`
    })
})

bookApp.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;


    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success:false,
            message: "please provide the data for update"
        })
    }

    const book = books.find((each)=> each.id === Number(id))

    if(!book){
        return res.status(404).json({
            success: false,
            message: 'book not found'
        })
    }

    const updatebook = books.map((each)=>{
        if(each.id === Number(id)){
            return {
                ...each,
                ...data
            }
        }
        return each;
    })

    res.status(201).json({
        success: true,
        data: updateUser,
        message: "User updated succesfully"

    })
})

bookApp.delete('/:id', (req, res) => {

    const { id } = req.params;

    const bookExists = books.find((each) => each.id === Number(id));

    if (!bookExists) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    const filteredBooks = books.filter((each) => each.id !== Number(id));

    res.status(200).json({
        success: true,
        message: "books deleted successfully",
        data: filteredBooks
    });

});


bookApp.get('/issued/for-user', (req, res) => {

    // Users who have issued books
    const userWithIssuedBooks = users.filter(
        (each) => each.issueBook
    );

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each) => {

        // Find book using book name
        const book = books.find(
            (b) => b.title === each.issueBook
        );

        if (book) {
            issuedBooks.push({
                ...book,
                issuedBy: each.name,
                issuedDate: each.issueDate,
                returnDate: each.returnDate
            });
        }
    });

    // If no books issued
    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued books found"
        });
    }

    // Success response
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
});



module.exports = bookApp;