import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Default User",
});

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default UserContext;
