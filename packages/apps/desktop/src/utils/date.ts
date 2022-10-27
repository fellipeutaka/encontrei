export function getDisplayDateValues(date: string) {
  const newDate = new Date(date);
  const displayDate = newDate.toLocaleDateString("pt-BR");
  const displayHour = newDate.toLocaleTimeString("pt-BR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    displayDate,
    displayHour,
  };
}
