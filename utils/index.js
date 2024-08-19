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

const getMonthDifference = (startDate, endDate) => {

    // Calcula la diferencia en años y meses
    let yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthsDiff = endDate.getMonth() - startDate.getMonth();

    // Ajusta la diferencia en meses según los días
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    if (endDay < startDay) {
        monthsDiff--;
    }

    // Convierte la diferencia en años a meses y añade la diferencia en meses
    return -1 * (yearsDiff * 12 + monthsDiff);
};

const validationVacationsDays_basedOnTimeInPlace = (employee, startDate, endDate) => {
    const joiningDate = new Date(employee.joiningDate);
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let daysTaken = employee.daysTaken

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const diff_vacationDay_joiningDate_months = getMonthDifference(date, joiningDate)
        if (diff_vacationDay_joiningDate_months < 9) {
            return false
        } else {
            daysTaken += 1
            if (diff_vacationDay_joiningDate_months >= 9 && diff_vacationDay_joiningDate_months < 12) {
                if (daysTaken > 7) {
                    return false
                }
            } else {
                if (daysTaken > 14) {
                    return false
                }
            }
        }
    }
    return true
}

const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMs = end - start;

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMs / msPerDay);

    return diffInDays;
}

const updateYear_current = (date) => {
    date = new Date(date)
    const today = new Date();
    const todayYear = today.getFullYear();
    date.setFullYear(todayYear);
    return date
}

const updateYear_next = (date) => {
    date = new Date(date)
    const today = new Date();
    const todayYear = today.getFullYear();
    const nextYear = todayYear + 1;
    date.setFullYear(nextYear);
    return date
}


const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwordHash = (password) => bcrypt.hash(password, saltRounds)

const isValidPassword = (password, user) => bcrypt.compare(password, user.password)



module.exports = {
    validationDate,
    validationVacationsDays_basedOnTimeInPlace,
    countDays,
    passwordHash,
    isValidPassword,
    updateYear_current,
    updateYear_next
}