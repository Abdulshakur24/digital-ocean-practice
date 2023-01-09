export const getFirstOrTwoLettersFromName = (name: string) => {
  if (!name) {
    return "";
  }
  let parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0][0];
  } else {
    return parts[0][0] + parts[1][0];
  }
};

export const isRouteMatched = (str1: string, str2: string) =>
  str1 === str2 || (str1.startsWith(str2) && str1.charAt(str2.length) === "/");

export const getBackendURL = (path: string) => {
  return `${process.env.REACT_APP_BACKEND_URL as string}/${path}`;
};

export const statuses = [
  {
    id: 1,
    title: "Online",
    color: "#00a354",
  },
  {
    id: 2,
    title: "Busy",
    color: "#ffd600",
  },
  {
    id: 3,
    title: "Offline",
    color: "#bdbdbd",
  },
];
