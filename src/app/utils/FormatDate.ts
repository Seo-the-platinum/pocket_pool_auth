const usersTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: usersTime,
  }).format(date);
};
