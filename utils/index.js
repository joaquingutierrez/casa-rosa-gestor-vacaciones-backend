const validationDate = (startDate, endDate, dateList, condition) => {
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    for (let range of dateList) {
        let rangeStartDate = new Date(range.startDate);
        let rangeEndDate = new Date(range.endDate);

        if ((startDate >= rangeStartDate && startDate <= rangeEndDate) || 
            (endDate >= rangeStartDate && endDate <= rangeEndDate) ||
            (startDate <= rangeStartDate && endDate >= rangeEndDate)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    validationDate
}