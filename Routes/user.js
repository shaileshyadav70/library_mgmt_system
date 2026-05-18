const express = require('express');

const app = express.Router();

const users = require("../data/user.json")

app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
})

app.get('/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id === Number(id));

    if(!user){
        return res.status(404).json({
            success:false,
            message:`user not found ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user,
    })
})

app.post('/', (req, res)=>{

    const {id, name, surname, issueBook, email, issueDate, returnDate, subscriptionDate, subscriptionType} = req.body;
    if(!id || !name || !surname|| !email || !subscriptionDate || !subscriptionType){
        return res.status(404).json({
            success:false,
            message: "Provide all required field"
        })
    }

    const user = users.find((each)=> each.id === Number(id));
    if(user){
        return res.status(409).json({
            success:false,
            message: `${user.id} is already exist`
        })
    }
    
    users.push({id, name, surname, issueBook, email, issueDate, returnDate, subscriptionDate, subscriptionType})

    res.status(201).json({
        success: true,
        message: `${id} is registerd successfuly`
    })
})

app.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;


    const user = users.find((each)=> each.id === Number(id))

    if(!user){
        return res.status(404).json({
            success: false,
            message: 'user not found'
        })
    }

    const updateUser = users.map((each)=>{
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

app.delete('/:id', (req, res) => {

    const { id } = req.params;

    const userExists = users.find((each) => each.id === Number(id));

    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const filteredUsers = users.filter((each) => each.id !== Number(id));

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: filteredUsers
    });

});

app.get('/sub-details/:id',(req,res)=>{

    const {id} = req.params;

    const user = users.find((each)=> each.id===Number(id));
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not find"
        })
    }

    const getdateInDays = (data = "") =>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor(date.getTime()/(1000*60*60*24))

        return days;
    }

    const subscType = (date) =>{
        if(users.subscriptionType === "Basic"){
            date = date + 90;
        } else if(users.subscriptionType === "Standard"){
            date = date + 180;
        } else if(users.subscriptionType === "Premium"){
            date = date + 365;
        }

        return date
    }
    let returndate = getdateInDays(user.returnDate);
    let currentdate = getdateInDays();
    let subsdate = getdateInDays(users.subscriptionDate);
    let expiration = subscType(subsdate);

    const data = {
        ...user,
        subscriptionExpired: expiration < currentdate,
        subscdaysleft: expiration - currentdate,
        daysleftforExpiration: returndate - currentdate,
        returndate: returndate < currentdate ? "Book is overdue" : returndate,
        fine: returndate < currentdate ? expiration <= currentdate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        date: data
    })
});

module.exports = app;

// app.all('/*splat', (req, res)=>{
//     res.status(500).json({
//         message: "Not buid yet"
//     })
// })

