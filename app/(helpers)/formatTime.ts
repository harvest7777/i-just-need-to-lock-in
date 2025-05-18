export const formatTime = (time: number) => {
  if (time === -1) return "Loading...";
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  let formattedString = "";
  if (hours > 0) formattedString += String(hours).padStart(2, "0") + ":";
  formattedString += String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  return formattedString;
};

export const secondsToHoursMins = (seconds: number) => {
  if(seconds<60) return `${seconds}s`
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hrString: string = `${hours > 0? hours+"h": ""}`
  return `${hrString} ${minutes}m`;
};

