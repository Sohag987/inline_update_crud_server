const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const morgan = require('morgan');
const nodemon = require('nodemon');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_db",
});

db.connect((error) => {
    if (error) console.log(error);
    else console.log("mySQL connected");

})

// Create Request 
app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    const sql = "INSERT INTO students(name,email,course) VALUES (?,?,?)";

    db.query(sql, [name, email, course], (err, result) => {
        if (err) { return res.json(err); }
        else { return res.json(result); }
    });
});


//read 
app.get('/students',(req,res)=>{
    const sql = "SELECT * FROM students";
    db.query(sql,(err,result)=>{
        if(err){return res.json(err);}
        return res.json(result); 
    })
});

// query for update 

app.put('/students/:id',(req,res)=>{
    const id = req.params.id;
    const {name ,email,course} = req.body;
    const sql = 'UPDATE students SET name=?, email=?, course=?  WHERE id=?';
    db.query(sql,[name,email,course,id],(err,result)=>{
        if(err) {res.json(err);}
        return res.json(result);
    });


});

//delete 

app.delete('/students/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM students WHERE id=?";

    db.query(sql,[id],(err,result)=>{
        if(err){return res.json(err);}
        return res.json(result);
     })

});

app.listen(5000,()=>{
    console.log("Server is running");
})