import {Link} from "react-router-dom"
import {BsFillSunFill} from "react-icons/bs"
import Container from "../Container"
import { useThemeToggler } from "../hooks";



export default function Navbar() {
    
    const toggleTheme = useThemeToggler();

    return (
        <div className="bg-secondary shadow-sm shadow-gray-500">
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <Link to="/"><img src="/logo-no-background.png" alt="Logo" className="h-20"/></Link>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <button onClick={toggleTheme} className="p-1 bg-dark-subtle rounded">
                                <BsFillSunFill className="text-secondary" size={24}/>
                            </button>
                        </li>
                        <li>
                            <input type="text" name="" id="" className="border-2 border-dark-subtle 
                            focus:border-white transition text-white
                            p-1 rounded bg-transparent text-xl outline-none " />
                        </li>
                        <li className="text-white font-semibold text-lg">
                            <Link to="/auth/sign-in">Login</Link>
                        </li>

                    </ul>
                </div>
            </Container>
        </div>
    )
}