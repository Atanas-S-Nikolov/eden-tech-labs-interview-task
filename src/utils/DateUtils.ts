export function formatMonthOrDay(day: number) {
  if (day > 0 && day < 10) {
    return `0${day}`;
  }

  return day.toString();
}
