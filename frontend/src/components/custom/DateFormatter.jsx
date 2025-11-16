export function formatDateTime(input) {
  // If input is already a Date object, use it directly
  let date;
  if (input instanceof Date) {
    date = input;
  } else if (typeof input === "string" && input.includes("-")) {
    // Parse "dd-mm-yyyy hh:mm"
    const [datePart, timePart] = input.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours = 0, minutes = 0] = timePart ? timePart.split(":").map(Number) : [0, 0];
    date = new Date(year, month - 1, day, hours, minutes);
  } else {
    date = new Date(input);
  }

  if (isNaN(date)) return "Invalid Date";

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  let hrs = date.getHours();
  const mins = String(date.getMinutes()).padStart(2, "0");
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;
  const formattedHrs = String(hrs).padStart(2, "0");

  return `${d}-${m}-${y} ${formattedHrs}:${mins} ${ampm}`;
}
