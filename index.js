// server.js
const express = require('express');
const app = express();
require('dotenv').config()
const connectDB = require('./config/db');
const rolRouter = require('./routes/rolRoute');
const employeeRouter = require("./routes/employeeRoute")
const vacationRouter = require("./routes/vacationRoute")
const loginRouter = require("./routes/loginRouter")
const logoutRouter = require("./routes/logoutRouter")
const validateTokenRouter = require("./routes/validateTokenRouter")
const cors = require('cors');
const cookieParser = require("cookie-parser");

connectDB();

app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto por la URL de tu cliente React
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())

app.use('/api/rol', rolRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/vacation', vacationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api/validate-token', validateTokenRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
