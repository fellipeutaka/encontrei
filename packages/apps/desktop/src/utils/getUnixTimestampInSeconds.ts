export function getUnixTimestampInSeconds(date = new Date()) {
  const timestampInMs = date.getTime();
  const timestampInSeconds = Math.floor(timestampInMs / 1000);
  return timestampInSeconds;
}
