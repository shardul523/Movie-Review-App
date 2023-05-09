import Logo from '../Logo'
import { CiLight } from 'react-icons/ci'


const Navbar = () => {
    return (
        <nav className='max-w-3xl mx-auto p-1
        flex justify-between items-center flex-wrap'>
            <Logo />
            <ul className='flex justify-evenly items-center space-x-6'>
                <li>
                    <button className=' bg-accent rounded'>
                    <CiLight size={26} className="text-white"/>
                    </button>
                </li>
                <li>
                    <input type="text" className='rounded p-1 outline-none
                    border-2 focus:border-accent' 
                    name="" id="" />
                </li>
                <li>
                    <a href='#'
                    className='text-white font-semibold'>Login</a>
                </li>
            </ul>
        </nav>
    );
};


export default Navbar;