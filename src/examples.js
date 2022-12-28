function getPostDate() {
  const date = new Date(Date.now()).toDateString();
  const [dayOfWeek, month, day, year] = date.split(' ');
  return {
    dayOfWeek,
    day,
    month,
    year,
  };
}
