import { createContext } from "react";

export const ThemeContext = createContext();


const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
};

const ThemeProvider = ({children}) => {

    return (
        <ThemeContext.Provider value={toggleTheme}>
            {children}
        </ThemeContext.Provider>
    );
};


export default ThemeProvider;