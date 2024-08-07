const validationDate = (startDate, endDate, dateList, condition) => {
    /* Para que sea una fecha de vacaciones valida, debe estar fuera del rango de las demas fechas; y si esta dentro del rango, debe ser diferente rol */
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    for (let range of dateList) {
        let rangeStartDate = new Date(range.startDate);
        let rangeEndDate = new Date(range.endDate);

        if (((startDate >= rangeStartDate && startDate <= rangeEndDate) ||
            (endDate >= rangeStartDate && endDate <= rangeEndDate) ||
            (startDate <= rangeStartDate && endDate >= rangeEndDate)) &&
            condition(range.rolId)) {
            return false
        }
    }
    return true;
}

const validationDaysTaken = (employee)=> {
    const joiningDate = employee.joiningDate
    const today = new Date();

    const diffMonths = (today.getFullYear() - joiningDate.getFullYear()) * 12 + (today.getMonth() - joiningDate.getMonth());

    const maxVacationDays = (diffMonths) => {
        switch(true) {
            case diffMonths < 9:
                return 0;
            case diffMonths >= 9 && diffMonths < 12:
                return 7; 
            case diffMonths >= 12:
                return 14;
            default:
                return 0;
        }
    }
    const maxVacationDaysResult = maxVacationDays(diffMonths)

    if (employee.daysTaken > maxVacationDaysResult) {
        return false
    }
    return true
}






const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwordHash = (password) => bcrypt.hash(password, saltRounds)

const isValidPassword = (password, user) => bcrypt.compare(password, user.password)



module.exports = {
    validationDate,
    validationDaysTaken,
    passwordHash,
    isValidPassword
}