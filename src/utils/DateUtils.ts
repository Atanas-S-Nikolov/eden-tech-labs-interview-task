import dayjs from "dayjs";

export function formatMonthOrDay(day: number) {
  if (day > 0 && day < 10) {
    return `0${day}`;
  }

  return day.toString();
}

export function isValidDate(value: string | Date) {
  const valueAsDate = dayjs(value);
  return value === '' || valueAsDate.isValid() && valueAsDate.isBefore(dayjs());
}
