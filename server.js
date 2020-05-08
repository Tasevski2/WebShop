const express = require('express');
const app = express();
const db = require('./config/db');


db();

app.use(express.json({ extended: false}));

app.get('/', (req, res) => {
    res.send("Server test route");
});

app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen( port ,() => {
    console.log(`Server started on port: ${port}`);
});