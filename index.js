const express = require('express');
const bodyparser = require('body-parser');
const qString = require('querystring');
const mysql = require('mysql');

var app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'pmauser',
    password: "1",
    database: 'mahasiswa',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('success');
        else
        console.log('Error'+ JSON.stringify(err, undefined, 2));
});

app.listen(3004, ()=> console.log('Server is Running'));

// Get all mahasiswa table
app.get('/mahasiswa', (req, res) => {
    let mtable = 'mahasiswa';
    var sql = 'SELECT * FROM mahasiswa';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an mahasiswa
app.get('/mahasiswa/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM mahasiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM mahasiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an mahasiswa
app.post('/mahasiswa/post', (req, res) => {
    let emp = req.body ;
    console.log(emp);
    var sql = "insert into mahasiswa set ? ";
    mysqlConnection.query(sql, emp, (err, rows, fields) => {
        if (!err)
            res.send('Inserted mahasiswa ' + console.log(emp));
        else
            console.log(err);
        })
});

//Update an mahasiswa
app.put('/mahasiswa', (req, res) => {
    let emp = req.body;
    var sql = "update mahasiswa set ? where ?";
    mysqlConnection.query(sql, [emp, { nim: emp.nim}], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});