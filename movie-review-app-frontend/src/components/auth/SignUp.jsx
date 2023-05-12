import Container from '../Container'
import FormTitle from '../form/FormTitle'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import CustomLink from '../CustomLink'


export default function SignUp() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='bg-secondary rounded p-6 w-72 space-y-4'>
                <FormTitle>Sign Up</FormTitle>
                <FormInput name="name" placeholder="John Doe" label="Name"/>
                <FormInput name="email" placeholder="john@example.com" label="Email"/>
                <FormInput name="password" placeholder="********" label="Password"/>
                <SubmitBtn>Sign Up</SubmitBtn>
                <div className="flex justify-between">
                  <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                  <CustomLink to="/auth/sign-in">Sign In</CustomLink>
                </div>
            </form>
        </Container>
    </div>
  )
}
