// server.js
const express = require('express');
const cron = require('node-cron');
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
/* const auth = require('./middlewares/auth');
 */
connectDB();

app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto por la URL de tu cliente React
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())

cron.schedule('0 0 * * *', async () => {
    try {
        const today = new Date();
        const employees = await Employee.find();

        for (const employee of employees) {
            const joiningDate = new Date(employee.joiningDate);

            // Crea una nueva fecha para la fecha actual con el año de joiningDate
            const anniversaryDate = new Date(today.getFullYear(), joiningDate.getMonth(), joiningDate.getDate());

            // Si el aniversario ya pasó este año, verifica el siguiente año
            if (anniversaryDate < today) {
                anniversaryDate.setFullYear(today.getFullYear() + 1);
            }

            // Verifica si el aniversario es hoy
            if (compareDatesIgnoringYear(today, anniversaryDate)) {
                employee.daysTaken = 0;
                await employee.save();
                console.log(`Días tomados reiniciados para el empleado ${employee._id}`);
            }
        }
    } catch (err) {
        console.error('Error al reiniciar los días tomados:', err);
    }
});

app.use('/api/rol', rolRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/vacation', vacationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api/validate-token', validateTokenRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
