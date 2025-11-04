function formatDateAndTime(timestamp) {
  let formattedDate = ``;
  const dateObj = new Date(timestamp);
  const dateToday = new Date();

  // Extracting date parts
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");

  // Extracting time parts
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  //   const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  //   const milliseconds = dateObj.getMilliseconds().toString().padStart(3, "0");

  // Convert hours to 12-hour format and add AM/PM
  let formattedHours = hours >= 12 ? hours - 12 : hours;
  const ampm = hours >= 12 ? "PM" : "AM";
  formattedHours = formattedHours === 0 ? 12 : formattedHours;

  // Formatting date and time strings
  if (date === dateToday.getDate().toString().padStart(2, "0")) {
    formattedDate = ``;
  } else {
    formattedDate = `${date}-${month}-${year}`;
  }
  //   const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
  return { formattedDate, formattedTime };
}

export default formatDateAndTime;
