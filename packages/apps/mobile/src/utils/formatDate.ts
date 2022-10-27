export function formatDate(dateInString: string) {
  const newDate = new Date(dateInString);
  const date = newDate.toLocaleDateString("pt-BR");
  const hour = newDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date,
    hour,
  };
}
