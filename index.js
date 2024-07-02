// server.js
const express = require('express');
const app = express();
require('dotenv').config()
const connectDB = require('./config/db');
const rolRouter = require('./routes/rolRoute');
const employeeRouter = require("./routes/employeeRoute")
const vacationRouter = require("./routes/vacationRoute")

connectDB();

app.use(express.json());

app.use('/api/rol', rolRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/vacation', vacationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
