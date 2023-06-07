import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export const useThemeToggler = () => useContext(ThemeContext);