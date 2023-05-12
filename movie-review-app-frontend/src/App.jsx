import SignIn from "./components/auth/SignIn"
import Navbar from "./components/user/Navbar"
import SignUp from "./components/auth/SignUp"
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import EmailVerification from './components/auth/EmailVerification'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'



export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth/sign-up" element={<SignUp/>} />
                <Route path="/auth/sign-in" element={<SignIn/>} />
                <Route path="/auth/verify-email" element={<EmailVerification/>} />
                <Route path="/auth/forget-password" element={<ForgetPassword/>} />
                <Route path="/auth/reset-password" element={<ResetPassword/>} />
            </Routes>
        </>
    )
}