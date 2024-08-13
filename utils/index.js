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

const validationVacationsDays_basedOnTimeInPlace = (employee, startDate, endDate) => {
    const joiningDate = new Date(employee.joiningDate);
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let daysTaken = employee.daysTaken

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        console.log(date)
        const diff_vacationDay_joiningDate_months = (date.getFullYear() - joiningDate.getFullYear()) * 12 + (date.getMonth() - joiningDate.getMonth());
        if (diff_vacationDay_joiningDate_months < 9) {
            return false
        } else {
            daysTaken += 1
            if (diff_vacationDay_joiningDate_months >= 9 && diff_vacationDay_joiningDate_months < 12) {
                if (daysTaken >= 7) {
                    return false
                }
            } else {
                if (daysTaken >= 14) {
                    return false
                }
            }
        }
    }
    return true
}




const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwordHash = (password) => bcrypt.hash(password, saltRounds)

const isValidPassword = (password, user) => bcrypt.compare(password, user.password)



module.exports = {
    validationDate,
    validationVacationsDays_basedOnTimeInPlace,
    passwordHash,
    isValidPassword
}