import Container from '../Container'
import FormTitle from '../form/FormTitle'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import CustomLink from '../CustomLink'


export default function SignIn() {
  

  return (
    <div className='fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='dark:bg-secondary rounded p-6 w-72 space-y-4'>
                <FormTitle>Sign In</FormTitle>
                <FormInput name="email" placeholder="name@example.com" label="Email"/>
                <FormInput name="password" placeholder="********" label="Password"/>
                <SubmitBtn>Sign In</SubmitBtn>
                <div className="flex justify-between">
                    <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                    <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
                </div>
            </form>
        </Container>
    </div>
  )
}
