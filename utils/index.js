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

module.exports = {
    validationDate
}