import {BsFillSunFill} from "react-icons/bs"
import Container from "../Container"


export default function Navbar() {
    return (
        <div className="bg-secondary shadow-sm shadow-gray-500">
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <img src="/logo-no-background.png" alt="Logo" className="h-20"/>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <button className="p-1 bg-dark-subtle rounded">
                                <BsFillSunFill className="text-secondary" size={24}/>
                            </button>
                        </li>
                        <li>
                            <input type="text" name="" id="" className="border-2 border-dark-subtle 
                            focus:border-white transition text-white
                            p-1 rounded bg-transparent text-xl outline-none " />
                        </li>
                        <li className="text-white font-semibold text-lg">Login</li>

                    </ul>
                </div>
            </Container>
        </div>
    )
}