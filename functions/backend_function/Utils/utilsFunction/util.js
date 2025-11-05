async function  dateTimeFormat(date) {
    const dateFormat = new Date(date);
    dateValue = dateFormat.toISOString().split('T')[0];
    timeVaue = dateFormat.toISOString().split('T')[1].split('.')[0].split(':');
    console.log("dateValue",dateValue)
    console.log("timeVaue",timeVaue)
    return dateValue + " " + timeVaue[0] + ":" + timeVaue[1]+":"+timeVaue[2];
  }

  module.exports = {dateTimeFormat}