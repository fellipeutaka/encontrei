function convertArrayOfObjectsToCSV(arr: any[]) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}

export function downloadCSV<T>(data: T[], table: string) {
  const link = document.createElement("a");
  const csv = convertArrayOfObjectsToCSV(data);
  const universalBOM = "\uFEFF";

  const result = !csv.match(/^data:text\/csv/i)
    ? `data:text/csv; charset=utf-8,${universalBOM + csv}`
    : csv;
  const filename = `${table}-${new Date()
    .toLocaleDateString()
    .replaceAll("/", ".")}.csv`;

  link.setAttribute("href", encodeURI(result));
  link.setAttribute("download", filename);
  link.click();
  link.remove();
}
