export const formatDateLong = (shortDate: string) => {
  const dateObj = new Date(shortDate);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const monthNameToNumber = (monthName: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = months.indexOf(monthName);
  return monthIndex >= 0 ? `0${monthIndex + 1}`.slice(-2) : null;
}; 